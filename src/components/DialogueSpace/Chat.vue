<script setup lang="ts">
import { Message } from '@models';
import MessageComponent from './Message.vue';
import MessageInput from './MessageInput.vue';
import { ref, onUnmounted } from 'vue';
import { useMessengerInfoStorage } from '@storage';

const messengerInfo = useMessengerInfoStorage();

const props = defineProps<{
    messages: Message[]
}>();

const isActive = ref(true);
const throttleTimeoutId = ref<number | null>(null);
const startLoading = () => {
    if (throttleTimeoutId.value === null)
        return;

    if (!messengerInfo.currentChat)
        return;

    const chatId = messengerInfo.currentChat.id;
    const length = messengerInfo.messages.filter((element) => element.chatId === chatId).length;
    messengerInfo.getMessages(length, 20);
    isActive.value = false;
    throttleTimeoutId.value = window.setTimeout(() => {
        isActive.value = true;
    }, 1000)
}

onUnmounted(() => {
    if (throttleTimeoutId.value === null)
        return;

    window.clearTimeout(throttleTimeoutId.value);
})
</script>

<template>
    <div class="chat-container">
        <div class="messages-container">
            <MessageComponent class="component" v-for="message in props.messages" :message="message" />
            <button class="load-more" :disabled="!isActive" @click="startLoading()">Load </button>
        </div>
        <MessageInput />
    </div>
</template>

<style scoped lang="scss">
.chat-container {
    height: 100%;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    & .messages-container {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column-reverse;
        gap: .5rem;
        padding-inline: 15px;

        & .load-more {
            width: 100%;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .5s ease;
            border-radius: .5rem;
            cursor: pointer;
            outline: none;
            border: none;
            background-color: var(--button-color);

            &:disabled {
                cursor: progress;
            }

            &:hover {
                background-color: var(--button-color-hover);
            }
        }

        & .component {
            opacity: 1;
            transform: translateX(0);
            transition: all .15s ease;
        }
    }
}
</style>