import { LoginRequest, User } from "@models";
import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";
import moment from 'moment';
import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import { api } from "../api";
import { useMessengerInfoStorage } from "./messengerStore";


export const useUserStore = defineStore('userStore', () => {
    const user = useLocalStorage<User | null>('User', null, { serializer: StorageSerializers.object });
    const expirationDate = useLocalStorage<string | null>('ExpirationDate', null);
    const messengerInfo = useMessengerInfoStorage();
    const updateInterval = ref<number | null>(null);

    onMounted(() => {
        if (!expirationDate.value)
            return;

        if (moment(expirationDate.value).isBefore(moment())) {
            user.value = null;
        }
        if (user.value) {
            messengerInfo.updateInfo();
        }
    })

    const loginUser = async (loginRequest: LoginRequest): Promise<boolean> => {
        const tempUser = await api.Login(loginRequest);
        if (!tempUser) {
            toastr.error("Login or password is incorrect");
            return false;
        }
        user.value = tempUser;
        expirationDate.value = moment().add(1, 'hour').toISOString();
        messengerInfo.updateInfo();

        return true;
    }

    const restoreWaiting = async () => {
        if (updateInterval.value != null)
            clearInterval(updateInterval.value);
        setInterval(async () => {
            await waitForUpdates();
        }, 15000);
    }

    watch(user, restoreWaiting);

    const waitForUpdates = async () => {
        if (!user.value) {
            return;
        }
        if (!await api.Waiting(user.value))
            return

        await messengerInfo.updateInfo();
        restoreWaiting();
    }

    const registerNewUser = async (userForm: LoginRequest): Promise<boolean> => {
        const result = await api.RegisterNewUser(userForm);
        if (result === null) {
            toastr.error("User with this nickname already exists.");
            return false;
        }
        toastr.success("New account successfully created");
        loginUser(userForm);
        messengerInfo.updateInfo();
        return true;
    }

    const changePassword = async (newPasswd: string) => {
        if (!user.value)
            return false;

        const changeResult = await api.ChangePassword(user.value, { login: user.value.login, password: newPasswd });
        if (!changeResult) {
            toastr.error("Password is incorrect");
            return false;
        }
        return true;
    }


    return {
        user,
        loginUser,
        changePassword,
        registerNewUser
    }
})