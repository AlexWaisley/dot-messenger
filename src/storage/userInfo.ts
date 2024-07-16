import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Chat, ChatDto, Message, MessageDto, User, UserDto } from '../models';
import { api } from '../api';
import toastr from 'toastr';
import 'toastr/toastr.scss';
import moment from 'moment';

export const useMessengerInfoStorage = defineStore('messengerInfo', () => {
    const user = ref<User>({
        id: "",
        login: ""
    });
    const userChats = ref<Chat[]>([]);
    const displayedUserChats = ref<Chat[]>([]);
    const messages = ref<Message[]>([]);
    const currentChat = ref<Chat>({
        name: "BRUUUUUUUH, IT`S BROKEN",
        id: ""
    });

    const checkUserLogedIn = async (): Promise<boolean> => {
        const jsonuser = localStorage.getItem("user");
        const expiredDate = localStorage.getItem("loginexpired");
        if (expiredDate !== null) {
            if (moment().unix() <= JSON.parse(expiredDate)) {
                if (jsonuser !== null) {
                    user.value = JSON.parse(jsonuser);
                    await getUserChats();
                    return true;
                }
            }
        }
        return false;
    }

    const loginUser = async (inpUser: UserDto): Promise<boolean> => {
        const tempUser = await api.CheckUserValid(inpUser);
        if (tempUser !== null) {
            user.value = tempUser;
            const expiredDate = moment().unix() + 3600;
            await getUserChats();
            localStorage.setItem("user", JSON.stringify(user.value));
            localStorage.setItem("loginexpired", JSON.stringify(expiredDate));
            return true;
        }
        toastr.error("Login or password is incorrect");
        return false;
    }

    const registerNewUser = async (userForm: UserDto): Promise<boolean> => {
        const result = await api.RegisterNewUser(userForm);
        if (result === null) {
            toastr.error("User with this nickname already exists.");
            return false;
        }
        toastr.success("New account successfully created");
        loginUser(userForm);
        return true;
    }

    const getUserChats = async () => {
        userChats.value = await api.GetUserChats(user.value);
        displayedUserChats.value = userChats.value;
    }

    const getMessages = async (inpChat: Chat, offset: number, count: number, inpUser: User = user.value) => {
        const tempMessages = await api.GetChatMessages(inpUser, inpChat, offset, count);
        if (tempMessages !== null) {
            tempMessages.forEach((element) => {
                if (messages.value.find((messege) => messege.id === element.id) === undefined) {
                    messages.value.unshift(element);
                }
            })
        }
        messages.value.sort((el1, el2) => el2.time - el1.time);
    }

    const addNewChat = async (inpUser: User = user.value, chatForm: ChatDto) => {
        const result = await api.AddChat(inpUser, chatForm);
        if (result !== null) {
            await getUserChats();
        }
    }

    const addMessageToChat = async (messageForm: MessageDto, inpUser: User = user.value, inpChat: Chat = currentChat.value) => {
        const result = await api.AddMessage(inpUser, inpChat, messageForm);
        if (result !== null) {
            await getMessages(inpChat, 0, 1, inpUser);
        }
    }

    const updateDisplayedChats = (findChat: string) => {
        displayedUserChats.value = userChats.value.filter((elem) => elem.name.toLowerCase().includes(findChat.toLowerCase()));
    }

    const changeCurrentChat = async (newCurrChat: Chat) => {
        await getMessages(newCurrChat, 0, 20);
        currentChat.value = newCurrChat;
    }

    return {
        user, currentChat, loginUser, userChats, getUserChats, messages, getMessages, registerNewUser, addNewChat, addMessageToChat, changeCurrentChat, checkUserLogedIn, displayedUserChats, updateDisplayedChats
    }
});