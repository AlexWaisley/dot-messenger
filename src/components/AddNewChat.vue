<script setup lang="ts">
import { api } from "../api";
import { useDisplayInfoStorage, useMessengerInfoStorage } from "../storage";
import { ref } from 'vue';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();


const chatName = ref("");
const opponentNickname = ref("");

const submit = async () => {
    await api.AddChat(messengerInfo.user, { name: chatName.value, opponentId: opponentNickname.value });
    messengerInfo.getUserChats();
    displayInfo.closeNewDialogueWindow();
}

</script>
<template>
    <div class="container">
        <div class="new-chat-window">
            <div class="input-fields-container">
                <div class="chat-name-field">
                    <label class="label">
                        <input class="input" v-model="chatName" name="chat-name" type="text" required>
                        <span class="placeholder">Enter chat name</span>
                    </label>
                </div>
                <div class="opponent-nickname-field">
                    <label class="label">
                        <input class="input" v-model="opponentNickname" name="opponent-nickname" type="text" required>
                        <span class="placeholder">Enter opponent nickname</span>
                    </label>
                </div>
            </div>
            <div class="action-buttons">
                <div @click="displayInfo.closeNewDialogueWindow" class="cancel-btn">CANCEL</div>
                <div @click="submit()" class="submit-btn">SUBMIT</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.377);
    z-index: 3;
    display: grid;
    place-items: center;
    transition: all .5s ease;

    & .new-chat-window {
        width: max(50%, 400px);
        height: max(50%, 200px);
        background-color: azure;
        border-radius: 5rem;
        display: grid;
        grid-template-rows: 4fr 1fr;

        & .input-fields-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;

            & .chat-name-field,
            & .opponent-nickname-field {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;
                gap: .5rem;
            }
        }

        & .action-buttons {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: space-around;

            & .cancel-btn,
            & .submit-btn {
                background-color: green;
                height: 50%;
                width: 40%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: .5rem;
                cursor: pointer;
                transition: all .5s ease;

                &:hover {
                    background-color: darkgreen;
                }
            }
        }
    }
}
</style>