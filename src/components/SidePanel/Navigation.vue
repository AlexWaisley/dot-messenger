<script setup lang="ts">
import { useDisplayInfoStorage } from "../../storage";

const displayInfo = useDisplayInfoStorage();

const emit = defineEmits(['changeSearchStatus']);
</script>
<template>
    <div>
        <div class="logo">
            <img src="/05059.jpg" alt="Logo">
        </div>
        <div @click="$emit('changeSearchStatus')" class="search-bar-icon">
            <img data-icon :src="'/search-icon.svg'" alt="search">
        </div>
        <div @click="displayInfo.openSettings" class="settings-icon">
            <img data-icon src="/settings-icon.svg" alt="search">
        </div>
        <div @click="displayInfo.sidePanelChange" :class="!displayInfo.isMainWithSidePanel ? 'left' : 'right'"
            class="hide-button-icon">
            <img data-icon src="/hide-button.svg" alt="Hide/Fix">
        </div>
    </div>
</template>
<style scoped lang="scss">
.logo {
    height: 75%;
    display: flex;
    justify-content: center;

    & img {
        max-height: 100%;
    }
}

.search-bar-icon,
.settings-icon,
.hide-button-icon {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;
    cursor: pointer;

    & img {
        transition: transform .5s ease;
        aspect-ratio: 1/1;
    }

    &:hover {
        background-color: var(--button-color-hover);
    }
}

.settings-icon:hover {
    & img {
        transform: rotate(90deg);
    }
}

.left>img {
    transform: rotate(180deg);
}

.right>img {
    transform: rotate(0);
}
</style>