<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from "@storage";
import { Chat } from '@models';
import { ref } from 'vue';
import moment from 'moment';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const props = defineProps<{ chat: Chat }>();

const lastMessage = ref("");
const lastMessageTime = ref("");

if (props.chat.lastMessage) {
    lastMessage.value = props.chat.lastMessage;
    if (moment().format('L') === moment.unix(props.chat.lastMessageTime).format('L')) {
        lastMessageTime.value = moment.unix(props.chat.lastMessageTime).format('HH:mm');
    }
    else {
        lastMessageTime.value = moment.unix(props.chat.lastMessageTime).format("YYYY/MM/D");
    }
}
else {
    lastMessage.value = "Dialog is empty";
}

const openChat = async () => {
    if (messengerInfo.currentChat.id !== props.chat.id) {
        await messengerInfo.changeCurrentChat(props.chat);
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
                <div class="user-nick">{{ props.chat.name }}</div>
                <div class="last-message-info">
                    <div class="time">{{ lastMessageTime }}</div>
                </div>
            </div>
            <div class="last-message-container">
                <div class="content">{{ lastMessage }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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