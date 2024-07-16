<script setup lang="ts">
import { Message } from '../models';
import MessageComponent from './Message.vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    messages: Message[]
}>();
const currChatMesseges = ref(props.messages);
watch(() => props.messages, () => {
    currChatMesseges.value = props.messages;
}, { immediate: true });

const emit = defineEmits(['load']);
const isactive = ref(true);
const startLoading = () => {
    emit('load');
    isactive.value = false;
    setTimeout(() => {
        isactive.value = true;
    }, 1000)
}
</script>

<template>
    <div class="chat-container">
        <MessageComponent class="component" v-for="message in props.messages" :message="message">
        </MessageComponent>
        <button class="load-more" :disabled="!isactive" :class="isactive ? '' : 'disabled'" @click="startLoading()">Load
        </button>
    </div>
</template>

<style scoped lang="scss">
.chat-container {
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 1rem 1rem .5rem 0;
    display: flex;
    flex-direction: column-reverse;
    gap: .5rem;
    overflow-x: hidden;

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

        &:hover {
            background-color: #dedede
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