import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Chat, ChatDto, Message, MessageDto, User, UserDto, Contact } from '../models';
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
    const contacts = ref<Contact[]>([]);
    const currentChat = ref<Chat>({
        name: "BRUUUUUUUH, IT`S BROKEN",
        id: "0",
        lastMessage: "bruh",
        lastMessageTime: 0,
        chatMembersIds: []
    });

    const checkUserLogedIn = async (): Promise<boolean> => {
        const jsonuser = localStorage.getItem("user");
        const jsoncontacts = localStorage.getItem("contacts");
        const expiredDate = localStorage.getItem("loginexpired");
        if (jsoncontacts === null) {
            return false;
        }
        if (expiredDate !== null) {
            if (moment().unix() <= JSON.parse(expiredDate)) {
                if (jsonuser !== null) {
                    user.value = JSON.parse(jsonuser);
                    contacts.value = JSON.parse(jsoncontacts);
                    await getUserChats();
                    await updateInfo();
                    return true;
                }
            }
        }
        return false;
    }

    const waiting = async () => {
        if (await api.Waiting(user.value)) {
            await updateInfo();
        }
        await waiting();
    }

    const loginUser = async (inpUser: UserDto): Promise<boolean> => {
        const tempUser = await api.CheckUserValid(inpUser);
        if (tempUser !== null) {
            user.value = tempUser;
            const expiredDate = moment().unix() + 3600;
            await getUserChats();
            localStorage.setItem("user", JSON.stringify(user.value));
            localStorage.setItem("contacts", JSON.stringify(contacts.value));
            localStorage.setItem("loginexpired", JSON.stringify(expiredDate));

            waiting();


            return true;
        }
        toastr.error("Login or password is incorrect");
        return false;
    }

    const changePassword = async (oldPassword: string, newPasswd: string) => {
        const tempUser = await api.CheckUserValid({ login: user.value.login, password: oldPassword });
        if (tempUser !== null) {
            await api.ChangePassword(user.value, { login: user.value.login, password: newPasswd });
            return true;
        }
        toastr.error("Password is incorrect");
        return false;
    }

    const updateInfo = async () => {
        contacts.value = await api.GetUserContacts(user.value);
        await getUserChats();
        if (currentChat.value.id !== "0")
            await getMessages(0, 5);
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

    const getMessages = async (offset: number, count: number) => {
        const tempMessages = await api.GetChatMessages(user.value, currentChat.value, offset, count);
        if (tempMessages !== null) {
            tempMessages.forEach((element) => {
                if (messages.value.find((messege) => messege.id === element.id) === undefined) {
                    messages.value.unshift(element);
                }
            })
        }
        messages.value.sort((el1, el2) => el2.time - el1.time);
    }

    const updateChatName = async (newName: string) => {
        currentChat.value.name = newName;
        await api.ChangeChatName(user.value, currentChat.value);
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
            await getMessages(0, 1);
        }
    }

    const updateDisplayedChats = (findChat: string) => {
        displayedUserChats.value = userChats.value.filter((elem) => elem.name.toLowerCase().includes(findChat.toLowerCase()));
    }

    const changeCurrentChat = async (newCurrChat: Chat) => {
        currentChat.value.id = newCurrChat.id;
        currentChat.value.name = newCurrChat.name;
        await getMessages(0, 20);
    }

    const getContactName = (id: string): string => {
        const contact = contacts.value.find(x => x.id === id);
        if (contact !== undefined)
            return contact.login;
        return "";
    }

    return {
        user, currentChat, loginUser, userChats, getUserChats, messages, getMessages, registerNewUser, addNewChat, addMessageToChat, changeCurrentChat, checkUserLogedIn, displayedUserChats, updateDisplayedChats, changePassword, updateChatName, getContactName
    }
});