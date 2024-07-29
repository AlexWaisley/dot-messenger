<script setup lang="ts">
import { Themes, ThemeType } from '@models';
import { useDisplayInfoStorage } from "@storage";

const displayInfo = useDisplayInfoStorage();

const changeTheme = (theme: ThemeType) => {
    displayInfo.changeTheme(theme);
};
</script>

<template>
    <div class="themes">
        <div v-for="theme in Themes" class="theme-container" :data-selected-theme="theme" @click="changeTheme(theme)">
            <div class="circle-demonstration">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.themes {
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all .5s ease;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: center;
    align-items: center;

    & .theme-container {
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        transition: transform .5s ease;

        & .circle-demonstration {
            min-width: 80px;
            min-height: 80px;
            background: linear-gradient(-45deg, var(--background) 30%, var(--hover-background) 70%);
            aspect-ratio: 1/1;
            cursor: pointer;
            border-radius: 50%;
            border: black solid 1px;
        }

        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>