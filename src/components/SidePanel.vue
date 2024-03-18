<script setup lang="ts">
import ChatsList from './ChatsList.vue';
</script>

<template>
    <div class="side-panel-container">
        <div class="side-panel">
            <ChatsList></ChatsList>
        </div>
        <div class="add-new-dialogue">
            <span>+</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.side-panel-container {
    width: 100%;
    display: flex;
    overflow-y: auto;
    background-color: rgb(244, 244, 244);
    position: relative;

    & .side-panel {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    & .add-new-dialogue {
        align-content: center;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.451);
        padding: 1rem;
        position: absolute;
        z-index: 1;
        display: flex;
        bottom: 1rem;
        right: 1rem;
        transition: all .3s ease;
        user-select: none;
        cursor: pointer;
    }

    & .add-new-dialogue:hover {
        background-color: rgba(255, 255, 255, 0.837);
    }
}
</style>
