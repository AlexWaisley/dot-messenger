import { defineStore } from "pinia";
import { ref } from "vue";
import { Themes } from "../models";

export const useDisplayInfoStorage = defineStore('displayInfo', () => {
    const isUserLoggedIn = ref(false);
    const isLoading = ref(false);
    const isDialogueOpen = ref(false);
    const isMainWithSidePanel = ref(true);
    const isAddNewChat = ref(false);
    const isSettingsOpen = ref(false);
    const currTheme = ref(Themes.BlueLight);

    const openSettings = () => {
        isSettingsOpen.value = true;
    }

    const changeTheme = (newTheme: Themes) => {
        currTheme.value = newTheme;
    }

    const closeDialogue = () => {
        isDialogueOpen.value = false;
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

    const themeConverter = (): string => {
        switch (currTheme.value) {
            case Themes.PinkLight: {
                return "pink-light"
            }
            case Themes.PinkDark: {
                return "pink-dark"
            }
            case Themes.BlueLight: {
                return "blue-light"
            }
            case Themes.BlueDark: {
                return "blue-dark"
            }
            case Themes.WBLight: {
                return "wb-light"
            }
            case Themes.WBDark: {
                return "wb-dark"
            }
            default: {
                return "Bruh broken";
            }
        }

    }

    return {
        loggedIn, isUserLoggedIn, isLoading, loadingStatusChange, closeDialogue, openDialogue, isDialogueOpen, isMainWithSidePanel, sidePanelChange, isAddNewChat, addNewDialogue, closeNewDialogueWindow, openSettings, isSettingsOpen, closeSettings, changeTheme, currTheme: themeConverter
    }
})