<script setup lang="ts">
import { Message } from '@models';
import MessageComponent from '@components/Message.vue';
import MessageInput from './MessageInput.vue';
import { ref, watch } from 'vue';
import { useMessengerInfoStorage } from '@storage';

const messengerInfo = useMessengerInfoStorage();


const props = defineProps<{
    messages: Message[]
}>();

const message = ref("");
const isTextEntered = ref(false);
const currChatMessages = ref(props.messages);

watch(() => message.value, () => {
    isTextEntered.value = message.value.length != 0;
}, { immediate: true })

watch(() => props.messages, () => {
    currChatMessages.value = props.messages;
}, { immediate: true });

const isActive = ref(true);
const startLoading = () => {
    const length = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id).length;
    messengerInfo.getMessages(length, 20);
    isActive.value = false;
    setTimeout(() => {
        isActive.value = true;
    }, 1000)
}
</script>

<template>
    <div class="chat-container">
        <div class="messages-container">
            <MessageComponent class="component" v-for="message in props.messages" :message="message" />
            <button class="load-more" :disabled="!isActive" :class="isActive ? '' : 'disabled'"
                @click="startLoading()">Load </button>
        </div>
        <MessageInput />
    </div>
</template>

<style scoped lang="scss">
.chat-container {
    height: 100%;
    position: relative;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    & .messages-container {
        max-height: 100%;
        max-width: 100%;
        overflow-y: auto;
        padding: 1rem 1rem .5rem 0;
        margin-bottom: 5rem;
        display: flex;
        flex-direction: column-reverse;
        gap: .5rem;
        overflow-x: hidden;
        margin: 0 0 5rem .5rem;
    }

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

        &:hover {
            background-color: var(--button-color-hover);
        }
    }

    & .disabled {
        cursor: progress;
    }

    & .component {
        opacity: 1;
        transform: translateX(0);
        transition: all .15s ease;
    }
}
</style>