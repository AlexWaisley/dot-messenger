<script setup lang="ts">
import moment from 'moment';
import { Message } from '../models';
import { useMessengerInfoStorage } from '../storage';

const messengerInfo = useMessengerInfoStorage();
import { ref, watch } from 'vue';


const props = defineProps<{
    message: Message
}>();

const currMessage = ref(props.message);
const messageTime = ref(moment.unix(props.message.time).format("HH:MM:ss"));
const isCurrUserMessage = ref(props.message.userId === messengerInfo.user.id);

watch(() => props.message, () => {
    currMessage.value = props.message;
    messageTime.value = moment.unix(props.message.time).format("HH:MM:ss");
    isCurrUserMessage.value = props.message.userId === messengerInfo.user.id;
}, { immediate: true });


</script>

<template>
    <div :class="isCurrUserMessage ? 'curr-user-message' : 'non-user-message'">
        <div class="message-info-container">
            <div class="image-wrapper">
                <img src="/04856.jpg" alt="someImg">
            </div>
            <div class="chat-info">
                <div class="last-message-info">
                    <div class="time">{{ messageTime }}</div>
                </div>
            </div>
        </div>
        <div class="text-container">
            <div class="last-message-container">
                <div class="content">{{ message.content }}</div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import '../styles/style.scss';

.non-user-message {
    display: flex;
    transition: all .3s ease;
    align-items: flex-end;
    gap: 1rem;
    background: var(--chat-opponent-message);
    padding: .5rem;
    border-radius: .5rem;

    & .message-info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        gap: .5rem;
        padding: .25rem;
        border-radius: .25rem;

        & .chat-info {
            width: 100%;
            display: flex;

            & .last-message-info {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            }
        }

        & .image-wrapper {
            display: flex;
            justify-content: center;
            height: 150px;
            aspect-ratio: 1/1;

            & img {
                height: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }
    }

    & .text-container {
        display: grid;
        width: 100%;
        text-align: justify;
        height: 100%;
        gap: .5rem;
    }
}

.curr-user-message {
    display: flex;
    transition: all .3s ease;
    align-items: flex-end;
    gap: 1rem;
    background: var(--chat-user-message);
    padding: .5rem;
    border-radius: .5rem;

    & .message-info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        gap: .5rem;
        padding: .25rem;
        border-radius: .25rem;


        & .chat-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: .25rem;

            & .last-message-info {
                width: 100%;
                display: flex;
                gap: .05rem;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }

        & .image-wrapper {
            display: flex;
            justify-content: center;
            height: 150px;
            aspect-ratio: 1/1;

            & img {
                height: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }
    }

    & .text-container {
        display: grid;
        width: 100%;
        text-align: justify;
        height: 100%;
        gap: .5rem;
    }
}
</style>