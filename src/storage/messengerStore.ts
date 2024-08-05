import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Chat, ChatDto, Message, MessageDto, Contact } from '@models';
import { api } from '../api';
import toastr from 'toastr';
import { useUserStore } from './userStore';

export const useMessengerInfoStorage = defineStore('messengerInfo', () => {
    const userChats = ref<Chat[]>([]);
    const messages = ref<Message[]>([]);
    const contacts = ref<Contact[]>([]);
    const currentChat = ref<Chat | null>(null);
    const userStore = useUserStore();

    const updateInfo = async () => {
        if (!userStore.user) {
            return;
        }
        contacts.value = await api.GetUserContacts(userStore.user);
        await getUserChats();
        if (!currentChat.value) {
            return;
        }

        await getMessages(0, 5);
    }

    const getUserChats = async () => {
        if (!userStore.user) {
            return;
        }
        userChats.value = await api.GetUserChats(userStore.user);
    }

    const getMessages = async (offset: number, count: number) => {
        if (!userStore.user || !currentChat.value)
            return;
        const tempMessages = await api.GetChatMessages(userStore.user, currentChat.value, offset, count);
        if (tempMessages !== null) {
            tempMessages.forEach((element) => {
                if (messages.value.find((message) => message.id === element.id) === undefined) {
                    messages.value.unshift(element);
                }
            })
        }
        messages.value.sort((el1, el2) => el2.time - el1.time);
    }

    const updateChatName = async (newName: string) => {
        if (!currentChat.value || !userStore.user) {
            return;
        }
        if (newName.length === 0) {
            toastr.error("Chat name must contain at least 1 symbol");
            return;
        }
        currentChat.value.name = newName;
        const chatId = currentChat.value.id;
        const chatToUpdate = userChats.value.find(x => x.id === chatId);
        if (chatToUpdate) {
            chatToUpdate.name = newName;
        }
        await api.ChangeChatName(userStore.user, currentChat.value);
    }

    const addNewChat = async (chatForm: ChatDto) => {
        if (!userStore.user) {
            return;
        }
        if (chatForm.name.length === 0) {
            toastr.error("Chat name must contain at least 1 symbol");
            return;
        }
        const result = await api.AddChat(userStore.user, chatForm);
        if (result !== null) {
            await updateInfo();
        }
    }

    const addMessageToChat = async (messageForm: MessageDto) => {
        if (!userStore.user || !currentChat.value) {
            return;
        }
        console.log(messageForm.content);
        const result = await api.AddMessage(userStore.user, currentChat.value, messageForm);
        if (result !== null) {
            await getMessages(0, 1);
        }
    }

    const changeCurrentChat = async (newCurrChat: Chat) => {
        if (currentChat.value && currentChat.value.id === newCurrChat.id)
            return;
        currentChat.value = newCurrChat;
        await getMessages(0, 20);
    }

    const getContactName = (id: string): string => {
        const contact = contacts.value.find(x => x.id === id);
        if (contact !== undefined)
            return contact.login;
        return "No contact with this id";
    }

    const deleteChat = async () => {
        if (!userStore.user || !currentChat.value) {
            return;
        }
        await api.DeleteChat(userStore.user, currentChat.value);
        currentChat.value = null;
        await updateInfo();
    }

    return {
        currentChat,
        userChats,
        messages,
        updateInfo,
        getUserChats,
        getMessages,
        addNewChat,
        addMessageToChat,
        changeCurrentChat,
        updateChatName,
        getContactName,
        deleteChat
    }
});