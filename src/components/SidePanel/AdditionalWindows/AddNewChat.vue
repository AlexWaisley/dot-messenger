<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from "@storage";
import { ref } from 'vue';
import InputField from '@components/InputField.vue';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const chatName = ref("");
const opponentNickname = ref("");

const submit = async () => {
    messengerInfo.addNewChat({ name: chatName.value, opponentNickname: opponentNickname.value });
    displayInfo.closeNewDialogueWindow();
    chatName.value = "";
    opponentNickname.value = "";
}
</script>
<template>
    <div class="container">
        <div class="new-chat-window">
            <div class="input-fields-container">
                <InputField placeholder="Enter chat name" type="text" :func="submit" v-model:inputModel="chatName" />
                <InputField placeholder="Enter opponent nickname" type="text" :func="submit"
                    v-model:inputModel="opponentNickname" />
            </div>
            <div class="action-buttons">
                <button @click="displayInfo.closeNewDialogueWindow" class="cancel-btn">CANCEL</button>
                <button @click="submit()" class="submit-btn">SUBMIT</button>
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
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 3;
    display: grid;
    place-items: center;
    transition: transform .5s ease;
    color: var(--text-color);

    & .new-chat-window {
        width: max(50%, 400px);
        height: max(50%, 200px);
        background-color: var(--background);
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
        }

        & .action-buttons {
            display: flex;
            width: 100%;
            height: 60%;
            justify-content: space-around;
        }
    }
}
</style>