<script setup lang="ts">
import { ref, watch } from "vue";
import { useMessengerInfoStorage } from "@storage";

const emits = defineEmits<{
    (e: 'change-search-status'): void;
    (e: 'change-side-panel-status'): void;
    (e: 'open-settings'): void;
}>();


const isToHide = ref(false);
const isOpenSearchBar = ref(false);
const messengerInfo = useMessengerInfoStorage();

watch(() => messengerInfo.currentChat, (chat) => {
    if (chat && window.innerWidth < 650) {
        isToHide.value = true;
    }
})

const changePanelStatus = () => {
    if (isToHide.value && window.innerWidth < 650) {
        messengerInfo.currentChat = null;
    }
    isToHide.value = !isToHide.value;
    emits('change-side-panel-status');
}

const openSearchBar = () => {
    isOpenSearchBar.value = !isOpenSearchBar.value;
    emits('change-search-status');
}
</script>
<template>
    <div :data-search-bar-on="isOpenSearchBar" class="navigation">
        <div class="logo">
            <img src="/05059.jpg" alt="Logo">
        </div>
        <div @click="openSearchBar" class="icon">
            <img data-icon :src="'/search-icon.svg'" alt="search">
        </div>
        <div @click="emits('open-settings')" class="settings icon">
            <img data-icon src="/settings-icon.svg" alt="search">
        </div>
        <div @click="changePanelStatus" :data-turned="isToHide" class="icon">
            <img data-icon src="/hide-button.svg" alt="Hide/Fix">
        </div>
    </div>
</template>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease;

    &[data-search-bar-on="true"] {
        height: 65%;
    }

    &[data-search-bar-on="false"] {
        height: 100%;
    }

    .logo {
        height: 75%;
        display: flex;
        justify-content: center;

        & img {
            max-height: 100%;
        }
    }

    .icon {
        height: 30px;
        width: 30px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .5s ease;
        cursor: pointer;

        &.settings:hover {
            & img {
                transform: rotate(90deg);
            }
        }

        & img {
            transition: transform .5s ease;
            aspect-ratio: 1/1;
        }

        &:hover {
            background-color: var(--button-color-hover);
        }

        &[data-turned="true"]>img {
            transform: rotate(180deg);
        }

        &[data-turned="false"]>img {
            transform: rotate(0);
        }
    }


}
</style>