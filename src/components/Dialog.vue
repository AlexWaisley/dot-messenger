<script setup lang="ts">
import Chat from './DialogueSpace/Chat.vue';
import Head from './DialogueSpace/DialogueHeader.vue';
import { computed } from 'vue';
import { useMessengerInfoStorage } from '@storage';
import { Message } from '@models';

const messengerInfo = useMessengerInfoStorage();

const messages = computed<Message[]>(() => {
    if (!messengerInfo.currentChat) {
        return [];
    }
    const chatId = messengerInfo.currentChat.id;
    return messengerInfo.messages.filter((element) => element.chatId === chatId);
});
</script>

<template>
    <div class="dialog">
        <div v-if="messengerInfo.currentChat" class="dialog__body">

            <Head />
            <Chat :messages="messages"></Chat>
        </div>
        <div v-else>
            No dialog picked
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    background-color: var(--background);

    &__body {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
}
</style>
