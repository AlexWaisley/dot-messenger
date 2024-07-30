<script setup lang="ts">
import Chat from './DialogueSpace/Chat.vue';
import Head from './DialogueSpace/DialogueHeader.vue';
import { ref, watch } from 'vue';

import { useDisplayInfoStorage, useMessengerInfoStorage } from '@storage';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const currChatMessages = ref(messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id));

watch(() => messengerInfo.currentChat.id, () => {
    currChatMessages.value = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id);
}, { immediate: true })

watch(messengerInfo.messages, () => {
    currChatMessages.value = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id);
}, { immediate: true });
</script>

<template>
    <div class="dialogue-container">
        <div v-if="!displayInfo.isDialogueOpen" class="no-dialogue">
            No dialogue picked
        </div>
        <div v-else class="dialogue">

            <Head></Head>
            <Chat :messages="currChatMessages"></Chat>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialogue-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    background-color: var(--background);
    color: var(--text-color);

    & .dialogue {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 5% 95%;
    }
}
</style>
