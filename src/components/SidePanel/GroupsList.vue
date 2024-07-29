<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessengerInfoStorage } from '@storage';
import { Chat } from '@models';
import ChatsList from './GroupComponents/ChatsList.vue';

const messengerInfo = useMessengerInfoStorage();

const chatsGroups = ref<Record<string, Chat[]>>({});

watch(() => messengerInfo.displayedUserChats, () => {
    chatsGroups.value = {};
    messengerInfo.displayedUserChats.sort((el, el1) => el1.lastMessageTime - el.lastMessageTime);
    messengerInfo.displayedUserChats.forEach(chat => {
        chat.chatMembersIds.sort((el, el1) => el1.localeCompare(el));
        chat.chatMembersIds.forEach(member => {
            const name = messengerInfo.getContactName(member);
            if (!chatsGroups.value[name]) {
                chatsGroups.value[name] = [];
            }
            if (!chatsGroups.value[name].find(x => x === chat))
                chatsGroups.value[name].push(chat);
        })
    });
}, { immediate: true });
</script>

<template>
    <div class="groups-list">
        <div class="group">
            <ChatsList v-for="(chats, nick) in chatsGroups" :chats="chats" :nick="nick" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.groups-list {
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .group {
        width: 100%;
        transition: all .5s ease;
        display: flex;
        flex-direction: column;
    }
}
</style>