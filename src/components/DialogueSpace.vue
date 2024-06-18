<script setup lang="ts">
import Chat from './Chat.vue'
import { ref, watch } from 'vue';

import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();


const isTextInputed = ref(false);
const message = ref("");

watch(() => message.value, () => {
    isTextInputed.value = message.value.length != 0;
}, { immediate: true })

</script>

<template>
    <div class="dialogue-container">
        <div v-if="!displayInfo.isDialogueOpen" class="no-dialogue">
            No dialogue picked
        </div>
        <div v-else class="dialogue">
            <div class="chat-header">
                <div class="person">
                    <div class="nickname">
                        <span>NickNadfsdsfdsfdsdsfsfme</span>
                    </div>
                </div>
                <div @click="displayInfo.closeDialogue" class="back-btn">
                    <img src="/add.svg" alt="Exit">
                </div>
            </div>
            <div class="chat">
                <Chat></Chat>
            </div>
            <div class="input-field">
                <div class="input-container">
                    <input type="text" v-model="message" placeholder="Write a message..." />
                </div>
                <div class="send-btn" :class="isTextInputed ? 'send' : ''">Send</div>
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
    background-color: #f4f4f4;

    & .dialogue {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 5% 85% 10%;

        & .chat-header {
            background-color: azure;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 1.5rem;
            padding: 0 .5rem;

            & .back-btn {
                position: absolute;
                right: .2rem;
                background-color: rgb(255, 0, 0);
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
                    background-color: rgb(234, 234, 234);
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
                }
            }

            .send-btn {
                position: absolute;
                right: .5rem;
                bottom: 7rem;
                background-color: rgb(247, 247, 247);
                height: 4rem;
                opacity: .9;
                aspect-ratio: 1/1;
                cursor: pointer;
                display: grid;
                place-content: center;
                transition: all .2s ease;
                border-radius: 50%;
                transform: translate(200%);

                &:hover {
                    background-color: #e8e8e8;
                }
            }

            & .send {
                transform: translate(0);
            }
        }
    }
}
</style>
