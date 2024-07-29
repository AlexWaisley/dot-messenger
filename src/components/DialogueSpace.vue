<script setup lang="ts">
import Chat from './Chat.vue'
import { ref, watch } from 'vue';

import { useDisplayInfoStorage, useMessengerInfoStorage } from "@storage";

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();
const chatName = ref(messengerInfo.currentChat.name);

const isEdit = ref(false);
const isTextEntered = ref(false);
const message = ref("");
const currChatMessages = ref(messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id));
watch(() => message.value, () => {
    isTextEntered.value = message.value.length != 0;
}, { immediate: true })

watch(() => messengerInfo.currentChat.id, () => {
    currChatMessages.value = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id);
    chatName.value = messengerInfo.currentChat.name;
}, { immediate: true })

watch(messengerInfo.messages, () => {
    currChatMessages.value = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id);
}, { immediate: true })

const sendNewMessage = () => {
    messengerInfo.addMessageToChat({ content: message.value });
    message.value = "";
}

const loadMoreMessages = () => {
    const length = messengerInfo.messages.filter((element) => element.chatId === messengerInfo.currentChat.id).length;
    messengerInfo.getMessages(length, 20);
}

const closeDialogue = () => {
    displayInfo.closeDialogue();
    messengerInfo.currentChat.id = "0";
}

const updateChatName = async () => {
    isEdit.value = false;
    if (messengerInfo.currentChat.name !== chatName.value)
        await messengerInfo.updateChatName(chatName.value);
}

</script>

<template>
    <div class="dialogue-container">
        <div v-if="!displayInfo.isDialogueOpen" class="no-dialogue">
            No dialogue picked
        </div>
        <div v-else class="dialogue">
            <div class="chat-header">
                <div class="chat-info">
                    <input type="text" v-model="chatName" class="chat-name" :class="isEdit ? 'edit' : ''"
                        @focus="isEdit = true" @blur="updateChatName">
                </div>
                <div @click="closeDialogue()" class="back-btn">
                    <img data-icon src="/add.svg" alt="Exit">
                </div>
            </div>
            <div class="chat">
                <Chat :messages="currChatMessages" @load="loadMoreMessages()"></Chat>
            </div>
            <div class="input-field">
                <div class="input-container">
                    <input v-on:keyup.enter="sendNewMessage()" type="text" v-model="message"
                        placeholder="Write a message..." />
                </div>
                <div @click="sendNewMessage()" class="send-btn" :class="isTextEntered ? 'send' : ''">Send</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialogue-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    background-color: var(--background);
    color: var(--text-color);

    & .dialogue {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 5% 85% 10%;

        & .chat-header {
            background-color: var(--panel);
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 1.5rem;
            padding: 0 .5rem;

            & .chat-info {
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc(100% - 80px);

                & .chat-name {
                    background-color: var(--panel);
                    outline: none;
                    width: 100%;
                    border: none;
                    text-align: center;

                    font-size: 2rem;
                    border-radius: 1.5rem;
                    transition: all .5s ease;
                    border: 1px solid transparent;

                    &:focus {
                        border: 1px solid var(--button-color);
                    }
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

        & .chat {
            display: flex;
            padding-left: .5rem;
        }

        & .input-field {
            display: flex;
            justify-content: space-between;
            border-radius: 1rem;
            gap: .5rem;
            margin: 0 .5rem;
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
    }
}
</style>
