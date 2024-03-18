<script setup lang="ts">
import Message from './Message.vue';
</script>

<template>
    <div class="chat-container">
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
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