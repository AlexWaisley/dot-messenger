import {defineStore} from 'pinia';
import { ref } from 'vue';
import { Chat, ChatDto, Message, MessageDto, User, UserDto } from '../models';
import { api } from '../api';
import toastr from 'toastr';
import 'toastr/toastr.scss';

export const useMessengerInfoStorage = defineStore('messengerInfo',()=>{
    const user = ref<User>({
        id:0,
        login:""
    });
    const userChats = ref<Chat[]>([]);
    const messages = ref<Message[]>([]);

    const loginUser = async (inpUser:UserDto):Promise<boolean>=>{
        const tempUser = await api.CheckUserValid(inpUser);
        if(tempUser !== null){
            user.value = tempUser;
            await getUserChats(user.value);
            return true;
        }
        toastr.error("Login or password is incorrect");
        return false
    }

    const registerNewUser = async (userForm:UserDto)=>{
        const result = await api.RegisterNewUser(userForm);
        if(result === null){
            toastr.error("User with this nickname already exists.");
        }
    }

    const getUserChats = async(inpUser:User)=>{
        userChats.value = await api.GetUserChats(inpUser);
    }

    const getMessages = async(inpUser:User,inpChat:Chat,offset:number,count:number)=>{
        const tempMessages = await api.GetChatMessages(inpUser, inpChat, offset, count);
        if(tempMessages !== null){
            tempMessages.forEach((element)=>{
                if(messages.value.find((messege)=>messege!==element)=== undefined){
                messages.value.push(element);}
            })
        }
    }

    const addNewChat = async(inpUser:User,chatForm:ChatDto)=>{
        const result = await api.AddChat(inpUser,chatForm);
        if(result !== null){
            await getUserChats(inpUser);
        }
    }

    const addMessageToChat = async (inpUser:User, inpChat:Chat, messageForm:MessageDto)=>{
        const result = await api.AddMessage(inpUser, inpChat, messageForm);
        if(result !== null){
            await getMessages(inpUser,inpChat,0,messages.value?.length+1);
        }
    }

    return{
        user, loginUser, userChats, getUserChats, messages, getMessages, registerNewUser, addNewChat, addMessageToChat    }
});