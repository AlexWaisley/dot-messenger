<script setup lang="ts">
import { computed } from 'vue';
import { useMessengerInfoStorage } from '@storage';
import { Chat } from '@models';
import ChatsList from './GroupComponents/ChatsList.vue';

const messengerInfo = useMessengerInfoStorage();

const props = defineProps<{
    searchString: string
}>();

const filteredChats = computed(() => {
    const searchLower = props.searchString.toLocaleLowerCase();
    return messengerInfo.userChats.filter(chat =>
        chat.name.toLocaleLowerCase().includes(searchLower)
    );
});

const sortedChats = computed(() => {
    return filteredChats.value
        .slice()
        .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
});

const chatsGroups = computed(() => {
    return sortedChats.value.reduce((groups, chat) => {
        const sortedMembers = chat.chatMembersIds.slice().sort((a, b) => b.localeCompare(a));

        sortedMembers.forEach(member => {
            const name = messengerInfo.getContactName(member);
            if (!groups[name]) {
                groups[name] = [];
            }
            if (!groups[name].includes(chat)) {
                groups[name].push(chat);
            }
        });

        return groups;
    }, {} as Record<string, Chat[]>);
});
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