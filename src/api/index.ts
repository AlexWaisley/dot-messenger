import axios from "axios";
import { Chat, ChatDto, Message, MessageDto, User, UserDto } from "../models";


const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
    async CheckUserValid(user: UserDto): Promise<User | null> {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/login`, user);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async GetUserChats(user: User): Promise<Chat[]> {
        const { data, status } = await axios.get(`${apiUrl}/UserInfo/users/${user.id}/chats`);
        console.log('[api]', 'Get all user chats status:', status);
        return data;
    },
    async Waiting(user: User): Promise<Boolean> {
        const { data, status } = await axios.get(`${apiUrl}/UserInfo/users/${user.id}/waiting`);
        if (status === 200) {
            return true;
        }
        console.log('[api]', 'Waiting:', status);
        return false;
    },
    async GetChatMessages(user: User, chat: Chat, offset: number, count: number): Promise<Message[] | null> {
        try {
            const { data, status } = await axios.get(`${apiUrl}/UserInfo/users/${user.id}/chats/${chat.id}/messages?offset=${offset}&count=${count}`);
            console.log('[api]', 'Getting chat messages status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async AddChat(user: User, chatForm: ChatDto) {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/users/${user.id}/chats`, chatForm);
            console.log('[api]', 'Add chat status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async AddMessage(user: User, chat: Chat, messageForm: MessageDto) {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/users/${user.id}/chats/${chat.id}/messages`, messageForm);
            console.log('[api]', 'Add message status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async RegisterNewUser(userForm: UserDto) {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/register`, userForm);
            console.log('[api]', 'User register status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async ChangePassword(user: User, userForm: UserDto) {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/users/${user.id}/changepass`, userForm);
            console.log('[api]', 'User password change status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async DeleteChat(user: User, chat: Chat) {
        try {
            const { data, status } = await axios.delete(`${apiUrl}/UserInfo/users/${user.id}/chats/${chat.id}`);
            console.log('[api]', 'Delete chat status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async ChangeChatName(user: User, chat: Chat) {
        try {
            const { data, status } = await axios.post(`${apiUrl}/UserInfo/users/${user.id}/chats/${chat.id}/name`, { id: chat.id, name: chat.name });
            console.log('[api]', 'Chat name change status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    async GetUserContacts(user: User): Promise<User[]> {
        const { data, status } = await axios.get(`${apiUrl}/UserInfo/users/${user.id}/contacts`);
        console.log('[api]', 'Get user contacts status:', status);
        return data;
    }
} as const;