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
    const currentChat = ref<Chat>({
        name:"BRUUUUUUUH, IT`S BROKEN",
        id:0
    });

    const checkUserLogedIn = async():Promise<boolean>=>{
        const jsonuser = localStorage.getItem("user");
        if(jsonuser!==null){
            user.value = JSON.parse(jsonuser);
            await getUserChats();
            return true;
        }
        return false
    }

    const loginUser = async (inpUser:UserDto):Promise<boolean>=>{
        const tempUser = await api.CheckUserValid(inpUser);
        if(tempUser !== null){
            user.value = tempUser;
            await getUserChats();
            localStorage.setItem("user",JSON.stringify(user.value));
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

    const getUserChats = async()=>{
        userChats.value = await api.GetUserChats(user.value);
    }

    const getMessages = async(inpChat:Chat,offset:number,count:number,inpUser:User = user.value)=>{
        const tempMessages = await api.GetChatMessages(inpUser, inpChat, offset, count);
        if(tempMessages !== null){
            tempMessages.forEach((element)=>{
                if(messages.value.find((messege)=>messege.id===element.id) === undefined){
                messages.value.unshift(element);
            }
            })
        }
        messages.value.sort((el1,el2)=>el2.time-el1.time);
    }

    const addNewChat = async(inpUser:User = user.value,chatForm:ChatDto)=>{
        const result = await api.AddChat(inpUser,chatForm);
        if(result !== null){
            await getUserChats();
        }
    }

    const addMessageToChat = async (messageForm:MessageDto,inpUser:User = user.value, inpChat:Chat = currentChat.value)=>{
        const result = await api.AddMessage(inpUser, inpChat, messageForm);
        if(result !== null){
            await getMessages(inpChat,0,1,inpUser);
        }
    }

    const changeCurrentChat = async (newCurrChat: Chat)=>{
        await getMessages(newCurrChat, 0, 20);
        currentChat.value = newCurrChat;
    }

    return{
        user, currentChat, loginUser, userChats, getUserChats, messages, getMessages, registerNewUser, addNewChat, addMessageToChat, changeCurrentChat, checkUserLogedIn    }
});