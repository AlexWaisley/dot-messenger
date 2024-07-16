<script setup lang="ts">
import ChatsList from './ChatsList.vue';
import SettingsWindow from './SettingsWindow.vue';
import AddNewChat from './AddNewChat.vue';
import { ref } from 'vue'
import { useDisplayInfoStorage, useMessengerInfoStorage } from "../storage";

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const isOpenSearchBar = ref(false);
const searchChat = ref("");

const changeSearchBarStatus = () => {
    isOpenSearchBar.value = !isOpenSearchBar.value;
}

const doSearch = () => {
    messengerInfo.updateDisplayedChats(searchChat.value);
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
                <div @click="displayInfo.openSettings" class="settings-icon">
                    <img src="/settings-icon.svg" alt="search">
                </div>
                <div @click="displayInfo.sidePanelChange" :class="!displayInfo.isMainWithSidePanel ? 'left' : 'right'"
                    class="hide-button-icon">
                    <img src="/hide-button.svg" alt="Hide/Fix">
                </div>
            </div>
            <div class="search-bar">
                <input type="text" v-on:keyup.enter="doSearch()" v-model="searchChat" placeholder="Write chat name...">
                <div @click="doSearch()" class="icon">
                    <img src="/search-icon.svg" alt="search">
                </div>
            </div>
        </div>
        <div class="chat-table">
            <ChatsList></ChatsList>
        </div>
        <div @click="displayInfo.addNewDialogue" class="add-new-dialogue">
            <img src="/add.svg" alt="add">
        </div>
    </div>
    <AddNewChat :class="displayInfo.isAddNewChat ? 'open' : 'close'"></AddNewChat>
    <SettingsWindow :class="displayInfo.isSettingsOpen ? 'open' : 'close'" class="settings-window"> </SettingsWindow>
</template>

<style scoped lang="scss">
@import '../styles/variables.scss';

.close {
    transform: translateY(-100%);
}

.open {
    transform: translateY(0);
}

.side-panel-container {
    width: 100%;
    display: grid;
    height: 100%;
    overflow-y: auto;
    grid-template-rows: max(5%, 100px) min(95%, calc(100vh - 110px));
    background-color: $panel;
    position: relative;
    transition: all .5s ease;
    z-index: 2;
    background-color: $panel;

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

            & .icon {
                img {
                    height: 0 !important;
                }
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

            & .icon {
                height: 30px;
                width: 30px;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .5s ease;
                cursor: pointer;

                & img {
                    transition: all .5s ease;
                    aspect-ratio: 1/1;
                    height: 60%;
                }

                &:hover {
                    background-color: rgb(211, 211, 211);
                }
            }

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
                    transition: transform .5s ease;
                    aspect-ratio: 1/1;
                }

                &:hover {
                    background-color: rgb(211, 211, 211);
                }
            }

            & .settings-icon:hover {
                & img {
                    transform: rotate(90deg);
                }
            }

            & .left>img {
                transform: rotate(180deg);
            }

            & .right>img {
                transform: rotate(0);
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
