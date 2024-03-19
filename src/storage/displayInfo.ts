import { defineStore } from "pinia";
import { ref } from "vue";

export const useDisplayInfoStorage = defineStore('displayInfo',()=>{
    const isUserLoggedIn = ref(false);
    const isLoading = ref(false);

    const loadingStatusChange= ()=>{
        isLoading.value = !isLoading.value;
        console.log("ss");
    }
    const loggedIn= ()=>{
        isUserLoggedIn.value = true;
        console.log("sntrh");
    }

    return{
        loggedIn,isUserLoggedIn,isLoading,loadingStatusChange
    }
})