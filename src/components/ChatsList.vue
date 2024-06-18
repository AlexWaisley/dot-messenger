<script setup lang="ts">
import ChatPreview from './ChatPreview.vue';

</script>

<template>
    <div class="chats-list">
        <ChatPreview v-for="_ in 20"> </ChatPreview>
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