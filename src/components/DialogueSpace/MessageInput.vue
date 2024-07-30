<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMessengerInfoStorage } from '@storage';

const messengerInfo = useMessengerInfoStorage();

const message = ref("");
const isTextEntered = ref(false);

watch(() => message.value, () => {
    isTextEntered.value = message.value.length != 0;
}, { immediate: true })

const sendNewMessage = () => {
    messengerInfo.addMessageToChat({ content: message.value });
    message.value = "";
}
</script>

<template>
    <div class=" input-field">
        <div class="input-container">
            <input v-on:keyup.enter="sendNewMessage()" type="text" v-model="message" placeholder="Write a message..." />
        </div>
        <div @click="sendNewMessage()" class="send-btn" :class="isTextEntered ? 'send' : ''">Send</div>
    </div>
</template>

<style scoped lang="scss">
.input-field {
    position: absolute;
    width: calc(100% - 1rem);
    display: flex;
    justify-content: space-between;
    border-radius: 1rem;
    bottom: 0;
    gap: .5rem;
    margin: .5rem;
    align-items: center;

    & .input-container {
        width: 100%;
        display: flex;
        justify-content: center;

        & input {
            padding: 1rem;
            height: 2rem;
            font-size: 1.25rem;
            border-radius: .9rem;
            width: 100%;
            outline: none;
            border: 0;
            background-color: var(--panel);
        }
    }

    & .send-btn {
        position: absolute;
        right: .5rem;
        bottom: 7rem;
        background-color: var(--button-color);
        height: 4rem;
        opacity: .9;
        aspect-ratio: 1/1;
        cursor: pointer;
        display: grid;
        place-content: center;
        transition: all .2s ease;
        border-radius: 50%;
        transform: translate(200%);
        box-shadow: var(--button-color-hover) 0px 0px 7px;

        &:hover {
            background-color: var(--button-color-hover);
        }
    }

    & .send {
        transform: translate(0);
    }
}
</style>