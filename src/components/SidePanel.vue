<script setup lang="ts">
import ChatsList from './ChatsList.vue';
import { ref, defineProps, watch } from 'vue'
import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();
const props = defineProps<{
    sideBarFixes: boolean
}>();

const isFix = ref(props.sideBarFixes);
const isOpenSearchBar = ref(false);
const isSettingsOpen = ref(false);
const isAddNewChat = ref(false);

watch(() => props.sideBarFixes, () => {
    isFix.value = !isFix.value;
}, { immediate: true })

const changeSearchBarStatus = () => {
    isOpenSearchBar.value = !isOpenSearchBar.value;
}

const addNewDialogue = () => {
    isAddNewChat.value = true;
}

const openSettings = () => {
    isSettingsOpen.value = true;
}

</script>

<template>
    <div class="side-panel-container">
        <div :class="isOpenSearchBar ? 'search-bar-on' : 'search-bar-off'" class="head">
            <div class="navigation ">
                <div class="logo">
                    <img src="/05059.jpg" alt="Logo">
                </div>
                <div @click="changeSearchBarStatus()" class="search-bar-icon">
                    <img src="/search-icon.svg" alt="search">
                </div>
                <div @click="openSettings()" class="settings-icon">
                    <img src="/settings-icon.svg" alt="search">
                </div>
                <div @click="displayInfo.sidePanelChange" :class="isFix ? 'left' : 'right'" class="hide-button-icon">
                    <img src="/hide-button.svg" alt="Hide/Fix">
                </div>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Write chat name...">
            </div>
        </div>

        <div class="chat-table">
            <ChatsList></ChatsList>
        </div>
        <div @click="addNewDialogue()" class="add-new-dialogue">
            <img src="/add.svg" alt="add">
        </div>
        <div v-if="isAddNewChat"></div>
        <div v-if="isSettingsOpen" class="settings-window"> </div>
    </div>
</template>

<style scoped lang="scss">
.side-panel-container {
    width: 100%;
    display: grid;
    height: 100%;
    overflow-y: auto;
    grid-template-rows: max(5%, 100px) min(95%, calc(100vh - 110px));
    background-color: rgb(244, 244, 244);
    position: relative;
    transition: all .5s ease;
    z-index: 2;

    & .search-bar-on {
        & .navigation {
            height: 65%;
        }

        grid-template-rows: 65% 30%;
        transition: all .5s ease;
        gap: 4%;

        & .search-bar {
            & input {
                height: max(100%, 2rem);
                width: 100%;
            }
        }

    }

    & .search-bar-off {
        & .navigation {
            height: 100%;
        }

        grid-template-rows: 100%;
        transition: all .5s ease;

        & .search-bar {
            & input {
                border: none;
                outline: none;
                height: 0;
            }
        }

    }


    & .head {
        display: flex;
        flex-direction: column;
        padding: .2rem;
        transition: all 0.5s ease;

        & .search-bar {
            display: flex;
            justify-content: center;

            & input {
                width: 95%;
                outline: none;
                border: none;
                border-radius: .7rem;
                transition: all .5s ease;
            }
        }

        & .navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.5s ease;

            & .logo {
                height: 75%;
                display: flex;
                justify-content: center;

                & img {
                    max-height: 100%;
                }
            }

            & .search-bar-icon,
            & .settings-icon,
            & .hide-button-icon {
                height: 30px;
                width: 30px;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .5s ease;
                cursor: pointer;

                & img {
                    aspect-ratio: 1/1;
                }

                &:hover {
                    background-color: rgb(211, 211, 211);
                }
            }

            & .left {
                & img {
                    transform: rotate(180deg);
                }
            }

            & .right {
                & img {
                    transform: rotate(0);
                }
            }
        }
    }

    & .chat-table {
        display: flex;
        justify-content: center;
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
    }

    & .add-new-dialogue {
        position: absolute;
        width: 30px;
        height: 30px;
        display: flex;
        align-content: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(255, 255, 255);
        padding: 1rem;
        bottom: 1rem;
        right: 1rem;
        transition: all .3s ease;
        user-select: none;
        cursor: pointer;
        opacity: .5;

        &:hover {
            opacity: .8;
        }
    }

}
</style>
