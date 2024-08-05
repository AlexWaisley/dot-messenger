<script setup lang="ts">
import { useMessengerInfoStorage } from "@storage";
import { ref } from 'vue';
import InputField from '@components/InputField.vue';
import { ChatDto } from "@models";

const messengerInfo = useMessengerInfoStorage();
const emits = defineEmits<{
    (e:'close'):void
}>();

const state = ref<ChatDto>({ name: "", opponentNickname: "" });

const submit = async () => {
    messengerInfo.addNewChat(state.value);
    emits('close')
    state.value = { name: "", opponentNickname: "" };
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="submit" class="new-chat-window">
            <div class="input-fields-container">
                <InputField placeholder="Enter chat name" type="text" v-model="state.name" />
                <InputField placeholder="Enter opponent nickname" type="text" v-model="state.opponentNickname" />
            </div>
            <div class="action-buttons">
                <button @click="emits('close')">CANCEL</button>
                <button type="submit">SUBMIT</button>
            </div>
        </form>
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
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 4;
    display: grid;
    place-items: center;
    transition: opacity .5s ease;
    color: var(--text-color);

    & .new-chat-window {
        width: max(50%, 400px);
        height: max(50%, 200px);
        background-color: var(--background);
        border-radius: 5rem;
        display: grid;
        transition: all .5s ease;
        grid-template-rows: 4fr 1fr;
        animation-name: go-down;
        animation-duration: 1s;

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