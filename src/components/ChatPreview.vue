<script setup lang="ts">
import { useMessengerInfoStorage } from "../storage";
import { useDisplayInfoStorage } from "../storage/displayInfo";
import { ref, watch } from 'vue';
import moment from 'moment';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();
const currTheme = ref(displayInfo.currTheme);

const props = defineProps<{
    id: string,
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
        lastMessageTime.value = moment.unix(lastMessage.value.time).format("YYYY/MM/D");
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
            lastMessageTime.value = moment.unix(lastMessage.value.time).format("YYYY/MM/D");
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
    <div @click="openChat" :class="currTheme()" class="chat-preview-container">
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
@import '../styles/style.scss';

.chat-preview-container {
    display: grid;
    grid-template-columns: 25% 75%;
    max-width: 100%;
    transition: all .3s ease;
    padding: 0.2rem .4rem;
    gap: .5rem;
    border-bottom: solid 1px var(--border-color);
    cursor: pointer;
    user-select: none;
    color: var(--text-color);

    & .avatar-container {
        display: flex;
        height: 100px;
        width: 100%;
        justify-content: center;

        & .image-wrapper {
            height: 100%;

            & img {
                height: 100px;
                max-width: 100%;
                object-fit: contain;
            }
        }
    }

    & .text-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 95%;

        & .chat-info {
            height: 50%;
            padding: .1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            & .last-message-info {
                height: 25px;
                width: 60px;
                font-size: 12px;
                display: flex;
                justify-content: flex-end;
            }

            & .user-nick {
                font-size: 14px;
                width: calc(95% - 60px);
                min-height: 25px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        & .last-message-container {
            display: flex;
            align-items: center;
            height: 50%;
            width: 100%;

            & .content {
                width: 90%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
    }

    &:hover {
        background-color: var(--hover-background);
    }
}
</style>