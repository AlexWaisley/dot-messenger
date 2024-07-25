import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { Themes, ThemeType } from "../models";


export const useDisplayInfoStorage = defineStore('displayInfo', () => {
    const isUserLoggedIn = ref(false);
    const isLoading = ref(false);
    const isDialogueOpen = ref(false);
    const isMainWithSidePanel = ref(true);
    const isAddNewChat = ref(false);
    const isSettingsOpen = ref(false);
    const currTheme = ref<ThemeType>(Themes['BlueLight']);

    const openSettings = () => {
        isSettingsOpen.value = true;
    }

    watch(currTheme, (value) => {
        document.documentElement.setAttribute("data-selected-theme", value)
    }, { immediate: true });

    const changeTheme = (newTheme: ThemeType) => {
        currTheme.value = newTheme;
        localStorage.setItem('theme', JSON.stringify(currTheme.value));
    }

    const closeDialogue = () => {
        isDialogueOpen.value = false;
        isMainWithSidePanel.value = true;
    }
    const closeSettings = () => {
        isSettingsOpen.value = false;
    }

    const addNewDialogue = () => {
        isAddNewChat.value = true;
    }
    const closeNewDialogueWindow = () => {
        isAddNewChat.value = false;
    }

    const openDialogue = () => {
        if (window.innerWidth < 650) {
            isMainWithSidePanel.value = false;
        }
        isDialogueOpen.value = true;
    }

    const loadingStatusChange = () => {
        isLoading.value = !isLoading.value;
    }

    const loggedIn = () => {
        isUserLoggedIn.value = true;
    }

    const sidePanelChange = () => {
        isMainWithSidePanel.value = !isMainWithSidePanel.value;
    }

    return {
        loggedIn, isUserLoggedIn, isLoading, loadingStatusChange, closeDialogue, openDialogue, isDialogueOpen, isMainWithSidePanel, sidePanelChange, isAddNewChat, addNewDialogue, closeNewDialogueWindow, openSettings, isSettingsOpen, closeSettings, changeTheme, currTheme
    }
})