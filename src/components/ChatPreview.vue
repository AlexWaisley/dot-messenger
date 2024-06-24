<script setup lang="ts">
import { useMessengerInfoStorage } from "../storage";
import { useDisplayInfoStorage } from "../storage/displayInfo";
import { ref, watch } from 'vue';
import moment from 'moment';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const props = defineProps<{
    id: number,
    name: string
}>();

setInterval(async () => {
    await messengerInfo.getMessages(props, 0, 1);
}, 1000);

const lastMessage = ref(messengerInfo.messages.find((element) => element.chatId === props.id));
const lastMessageStr = ref("");
const lastMessageTime = ref();


if (lastMessage.value !== undefined) {
    lastMessageStr.value = lastMessage.value.content;
    if (moment().format('L') === moment.unix(lastMessage.value.time).format('L')) {
        lastMessageTime.value = moment.unix(lastMessage.value.time).format('HH:MM');
    }
    else {
        lastMessageTime.value = moment.unix(lastMessage.value.time).format("lll");
    }
}
else {
    lastMessageStr.value = "Dialog is empty";
}

watch(messengerInfo.messages, () => {
    lastMessage.value = messengerInfo.messages.find((element) => element.chatId === props.id);
    if (lastMessage.value !== undefined) {
        lastMessageStr.value = lastMessage.value.content;
        if (moment().format('L') === moment.unix(lastMessage.value.time).format('L')) {
            lastMessageTime.value = moment.unix(lastMessage.value.time).format('HH:MM');
        }
        else {
            lastMessageTime.value = moment.unix(lastMessage.value.time).format("lll");
        }
    }
    else {
        lastMessageStr.value = "Dialog is empty";
    }
})

const openChat = async () => {
    if (messengerInfo.currentChat.id !== props.id) {
        await messengerInfo.changeCurrentChat({ id: props.id, name: props.name });
        displayInfo.openDialogue();
    }
}

</script>

<template>
    <div @click="openChat" class="chat-preview-container">
        <div class="avatar-container">
            <div class="image-wrapper">
                <img src="/04856.jpg" alt="someImg">
            </div>
        </div>
        <div class="text-container">
            <div class="chat-info">
                <div class="user-nick">{{ props.name }}</div>
                <div class="last-message-info">
                    <div class="time">{{ lastMessageTime }}</div>
                </div>
            </div>
            <div class="last-message-container">
                <div class="content">{{ lastMessageStr }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.chat-preview-container {
    display: flex;
    max-width: 100%;
    height: 150px;
    transition: all .3s ease;
    gap: .5rem;
    border-radius: .5rem;

    &:nth-child(even) {
        background-color: bisque;
    }

    & .avatar-container {
        display: flex;
        height: 100px;
        width: 20%;
        justify-content: center;

        & .image-wrapper {
            height: 100%;

            & img {
                height: 100%;
                max-width: 100%;
                object-fit: contain;
            }
        }
    }

    & .text-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;

        & .chat-info {
            max-width: 100%;
            padding: .1rem;
            display: flex;
            flex-direction: column;

            & .last-message-info {
                display: flex;
                flex-direction: column;
                min-width: 40px;
            }

            & .user-nick {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        & .last-message-container {
            display: grid;
            justify-content: space-between;
            height: 40%;
            width: 100%;

            & .content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
    }

    &:hover {
        background-color: azure;
    }
}
</style>