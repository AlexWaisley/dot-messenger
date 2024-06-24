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


</script>

<template>
    <div class="chat-container">
        <MessageComponent v-for="message in props.messages" :message="message"></MessageComponent>
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
}
</style>