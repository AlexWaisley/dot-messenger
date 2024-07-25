<script setup lang="ts">
import ChatPreview from './ChatPreview.vue';
import { ref, watch } from 'vue';
import { useMessengerInfoStorage } from '../storage';
import { Chat } from '../models';

const messengerInfo = useMessengerInfoStorage();

const chatsGroups = ref<Record<string, Chat[]>>({});
const isHide = ref(false);
const hideList = () => {
    isHide.value = !isHide.value;
}


watch(messengerInfo.userChats, () => {
    messengerInfo.userChats.sort((el, el1) => el1.lastMessageTime - el.lastMessageTime);
    messengerInfo.userChats.forEach(chat => {
        chat.chatMembersIds.sort((el, el1) => el1.localeCompare(el));
        chat.chatMembersIds.forEach(member => {
            const name = messengerInfo.getContactName(member);
            if (!chatsGroups.value[name]) {
                chatsGroups.value[name] = [];
            }
            chatsGroups.value[name].push(chat);
        })
    });
}, { immediate: true });
</script>

<template>
    <div class="groups-list">
        <div class="group" v-for="(chats, nick) in chatsGroups">
            <div class="opponent-nick" @click="hideList">{{ nick }}</div>
            <div class="chats-list">
                <ChatPreview v-for="chat in chats" :chat="chat">
                </ChatPreview>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.groups-list {
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    & .group {
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;

        & .opponent-nick {
            text-align: center;
            background-color: var(--hover-background);
        }

        & .chats-list {
            width: 100%;
            max-height: 100%;
            display: flex;
            flex-direction: column;
            transition: all .5s ease;
        }
    }
}
</style>