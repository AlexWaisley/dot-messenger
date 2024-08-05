<script setup lang="ts">
import { ref } from 'vue';
import { useMessengerInfoStorage } from '@storage';
import { MessageDto } from '@models';

const messengerInfo = useMessengerInfoStorage();

const message = ref<MessageDto>({ content: "" });

const sendNewMessage = () => {
    messengerInfo.addMessageToChat(message.value);
    message.value.content = "";
}
</script>

<template>
    <form @submit.prevent="sendNewMessage" class="message-input">
        <div class="message-input__text">
            <input type="text" v-model="message.content" placeholder="Write a message..." />
        </div>
        <button type="submit" class="message-input__submit"
            :data-message-ready="message.content.length != 0">Send</button>
    </form>
</template>

<style scoped lang="scss">
.message-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px;
    position: relative;

    &__text {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 50px;
        border-radius: 15px;
        overflow: hidden;

        & input {
            padding: 1rem;
            font-size: 1.25rem;
            height: 100%;
            width: 100%;
            outline: none;
            border: 0;
            background-color: var(--panel);
        }
    }

    &__submit {
        position: absolute;
        z-index: 10;
        right: 10px;
        bottom: 60px;
        background-color: var(--button-color);
        height: 4rem;
        opacity: .9;
        aspect-ratio: 1/1;
        cursor: pointer;
        display: grid;
        place-content: center;
        transition: all .2s ease;
        border-radius: 50%;
        transform: translateX(200%);
        letter-spacing: normal;
        box-shadow: var(--button-color-hover) 0px 0px 7px;

        &[data-message-ready=true] {
            transform: translateX(0);
        }

        &:hover {
            background-color: var(--button-color-hover);
        }
    }

}
</style>