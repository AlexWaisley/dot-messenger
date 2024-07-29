<script setup lang="ts">
import ChatPreview from './ChatPreview.vue';
import { ref } from 'vue';
import { Chat } from '@models';

const props = defineProps<{
    chats: Chat[],
    nick: string
}>();

const isHide = ref(false);
const hideList = () => {
    isHide.value = !isHide.value;
}
</script>

<template>
    <div class="opponent-nick" @click="hideList">
        <span>{{ props.nick }}</span>
        <div :class="isHide ? 'show' : 'hide'" class="expand">
            <img data-icon src="/hide-button.svg" alt="" />
        </div>
    </div>
    <Transition>
        <div v-if="!isHide" class="chats-list">
            <ChatPreview v-for="chat in props.chats" :chat="chat" />
        </div>
    </Transition>
</template>

<style scoped lang="scss">
$expand-icon: 90deg;

.opponent-nick {
    min-height: 1.75rem;
    height: 1.75rem;
    font-size: 1.25rem;
    text-align: center;
    background-color: var(--group-name-bg);
    transition: background-color .5s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    & .show {
        $expand-icon: 90deg;
        transform: rotate($expand-icon);
    }

    & .hide {
        $expand-icon: -90deg;
        transform: rotate($expand-icon);
    }

    & .expand {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        height: 100%;
        transition: transform .5s ease;
    }

    &:hover {
        background-color: var(--group-name-bg-hover);

        & .hide {
            transform: rotate($expand-icon);
        }

        & .show {
            $expand-icon: -90deg;
            transform: rotate($expand-icon);
        }
    }
}

.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: all 0.5s ease;
    height: 100%;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    height: 0;

}

.chats-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: height 0.5s ease, transform 0.5s ease, opacity 0.5s ease;
}
</style>