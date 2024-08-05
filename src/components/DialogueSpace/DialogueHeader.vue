<script setup lang="ts">
import { useMessengerInfoStorage } from '@storage';
import { ref } from 'vue';
import DialogueSettings from '../AdditionalWindows/DialogueSettings.vue';
const messengerInfo = useMessengerInfoStorage();

const closeDialogue = () => {
    messengerInfo.currentChat = null;
}

const openSettings = ref(false);
</script>

<template>
    <div class="chat-header">
        <div @click="openSettings = true" class="chat-info">
            <span>{{ messengerInfo.currentChat?.name }}</span>
        </div>
        <div @click="closeDialogue()" class="back-btn">
            <img data-icon src="/add.svg" alt="Exit">
        </div>
    </div>
    <Teleport to="body">
        <Transition>
            <DialogueSettings v-if="openSettings" @close="openSettings = false" />
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.chat-header {
    background-color: var(--panel);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.5rem;
    padding: 0 .5rem;
    height: 50px;

    & .chat-info {
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        & .chat-name {
            background-color: var(--panel);
            width: 100%;
            text-align: center;
            font-size: 2rem;
        }
    }

    & .back-btn {
        position: absolute;
        right: .2rem;
        background-color: var(--button-color);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: .25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all .3s ease;

        & img {
            height: 100%;
            transform: rotate(45deg);
        }

        &:hover {
            background-color: var(--button-color-hover);
            transform: rotate(90deg);
        }
    }
}
</style>