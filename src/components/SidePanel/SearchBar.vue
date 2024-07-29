<script setup lang="ts">
import { ref } from 'vue'
import { useMessengerInfoStorage } from "@storage";

const messengerInfo = useMessengerInfoStorage();
const searchChat = ref("");
const props = defineProps<{
    isOn: boolean
}>();

const doSearch = () => {
    messengerInfo.updateDisplayedChats(searchChat.value);
    console.log(messengerInfo.displayedUserChats);
}
</script>
<template>
    <div>
        <input :class="props.isOn ? 'on' : 'off'" type="text" v-on:keyup.enter="doSearch()" v-model="searchChat"
            placeholder="Enter chat name...">
        <div :class="props.isOn ? 'on' : 'off'" @click="doSearch()" class="icon">
            <img data-icon src="/search-icon.svg" alt="search">
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '../../styles/animations.scss';

.on {
    opacity: 1;
}

.off {
    opacity: 0;
    z-index: -2;
}

.icon {
    min-height: 30px;
    min-width: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;
    cursor: pointer;

    & img {
        height: 60%;
    }

    &:hover {
        background-color: var(--button-color-hover);
    }
}

input {
    padding-left: .4rem;
    width: 95%;
    outline: none;
    border: none;
    border-radius: .7rem;
    transition: all .5s ease;
    background-color: var(--background);
}
</style>