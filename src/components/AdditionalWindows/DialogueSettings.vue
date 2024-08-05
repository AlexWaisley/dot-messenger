<script setup lang="ts">
import { useMessengerInfoStorage } from '@storage';
import { ref } from 'vue';
const messengerInfo = useMessengerInfoStorage();

const isEdit = ref(false);
const chatName = ref(messengerInfo.currentChat?.name);

const emits = defineEmits<{
    (e: 'close'): void;
}>();

const updateChatName = async () => {
    isEdit.value = false;
    if (!messengerInfo.currentChat || messengerInfo.currentChat.name === chatName.value)
        return;

    await messengerInfo.updateChatName(chatName.value!);
}

const deleteThisChat = () => {
    messengerInfo.deleteChat();
    emits('close');
}
</script>

<template>
    <div class="container">
        <div class="settings-window">
            <div class="head">
                <span class="top">Chat settings</span>
                <div @click="emits('close')" class="close-btn">
                    <img data-icon src="/add.svg" alt="Exit">
                </div>
            </div>
            <div class="options">
                <div class="chat-info">
                    <input type="text" class="chat-name" v-model="chatName" @focus="isEdit = true"
                        @blur="updateChatName" />
                </div>
                <button class="update-chat-photo">Update chat photo</button>
                <button @click="deleteThisChat" class="delete-chat">Delete chat</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import "/src/styles/animations.scss";

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.377);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .5s ease;

    & .settings-window {
        width: max(50%, 400px);
        height: max(35%, 300px);
        background-color: var(--background);
        border-radius: 1.6rem;
        padding: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        gap: .5rem;
        animation-name: go-down;
        animation-duration: 1s;

        & .head {
            min-height: 50px;

            & .top {
                font-size: 2rem;
            }

            & .close-btn {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                width: 50px;
                height: 50px;
                display: flex;
                cursor: pointer;
                background-color: var(--button-color);
                border-radius: 2rem;
                transition: all .5s ease;

                & img {
                    transition: all .5s ease;
                    transform: rotate(45deg);
                }

                &:hover {
                    background-color: var(--button-color-hover);

                    & img {
                        transform: rotate(135deg);
                    }
                }
            }
        }

        & .options {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-around;

            & .delete-chat {
                color: #fff;
                background-color: #9a2020;

                &:hover {
                    background-color: #7d1818;
                }
            }


            & .chat-info {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;

                & .chat-name {
                    background-color: var(--background);
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

        }
    }
}
</style>