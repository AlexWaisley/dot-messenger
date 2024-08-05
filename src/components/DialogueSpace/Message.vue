<script setup lang="ts">
import moment from 'moment';
import { Message } from '@models';
import { useUserStore } from '@storage';
import { computed } from 'vue';

const userStore = useUserStore();

const props = defineProps<{
    message: Message
}>();

const isCurrUserMessage = computed<boolean>(() => props.message.userId === userStore.user?.id);
const messageTime = computed<string>(() => moment.unix(props.message.time).format("HH:mm:ss"));
</script>

<template>
    <div class="message" :data-message-user="isCurrUserMessage">
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
.message {
    display: flex;
    transition: all .3s ease;
    align-items: flex-end;
    gap: 1rem;
    padding: .5rem;
    border-radius: .5rem;

    &[data-message-user="true"] {
        background: var(--chat-user-message);
    }

    &[data-message-user="false"] {
        background: var(--chat-opponent-message);
    }

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
            height: 100px;
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