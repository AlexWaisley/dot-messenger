import { defineStore } from "pinia";
import { ref } from "vue";

export const useDisplayInfoStorage = defineStore('displayInfo',()=>{
    const isUserLoggedIn = ref(false);
    const isLoading = ref(false);
    const isDialogueOpen = ref(false);
    const isMainWithSidePanel = ref(true);

    const closeDialogue = ()=>{
        isDialogueOpen.value = false;
    }

    const openDialogue = ()=>{
        if(window.innerWidth<650){
            isMainWithSidePanel.value = false;
        }
        isDialogueOpen.value = true;
    }

    const loadingStatusChange = ()=>{
        isLoading.value = !isLoading.value;
    }
    
    const loggedIn = ()=>{
        isUserLoggedIn.value = true;
    }

    const sidePanelChange = () => {
        isMainWithSidePanel.value = !isMainWithSidePanel.value;
    }

    return{
        loggedIn,isUserLoggedIn,isLoading,loadingStatusChange, closeDialogue, openDialogue, isDialogueOpen, isMainWithSidePanel, sidePanelChange
    }
})