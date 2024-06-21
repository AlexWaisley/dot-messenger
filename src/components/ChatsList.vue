<script setup lang="ts">
import ChatPreview from './ChatPreview.vue';
import { useMessengerInfoStorage } from '../storage';

const messengerInfo = useMessengerInfoStorage();

</script>

<template>
    <div class="chats-list">
        <ChatPreview v-for="chat in messengerInfo.userChats" :id="chat.id" :name="chat.name"></ChatPreview>
    </div>
</template>

<style scoped lang="scss">
.chats-list {
    padding: .2rem;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: .5rem;

}
</style>