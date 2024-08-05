import { defineStore } from "pinia";
import { watch } from "vue";
import { Themes, ThemeType } from "@models";
import { useLocalStorage } from "@vueuse/core";


export const useDisplayInfoStorage = defineStore('displayInfo', () => {
    const currentTheme = useLocalStorage('x-theme', Themes['BlueLight']);

    watch(currentTheme, (value) => {
        document.documentElement.setAttribute("data-selected-theme", value)
    }, { immediate: true });

    const changeTheme = (newTheme: ThemeType) => {
        currentTheme.value = newTheme;
    }

    return {
        changeTheme
    }
})