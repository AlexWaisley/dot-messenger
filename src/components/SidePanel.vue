<script setup lang="ts">
import GroupsList from './SidePanel/GroupsList.vue';
import SettingsWindow from './SidePanel/AdditionalWindows/SettingsWindow.vue';
import AddNewChat from './SidePanel/AdditionalWindows/AddNewChat.vue';
import Navigation from './SidePanel/Navigation.vue';
import SearchBar from './SidePanel/SearchBar.vue';
import { ref } from 'vue'
import { useDisplayInfoStorage } from "@storage";

const displayInfo = useDisplayInfoStorage();

const isOpenSearchBar = ref(false);

const changeSearchBarStatus = () => {
    isOpenSearchBar.value = !isOpenSearchBar.value;
}
</script>

<template>
    <div class="side-panel-container">
        <div :class="isOpenSearchBar ? 'search-bar-on' : 'search-bar-off'" class="head">
            <Navigation class="navigation" @change-search-status="changeSearchBarStatus"></Navigation>
            <SearchBar class="search-bar" :isOn="isOpenSearchBar"> </SearchBar>
        </div>
        <GroupsList></GroupsList>
        <div @click="displayInfo.addNewDialogue" class="add-new-dialogue">
            <img data-icon src="/add.svg" alt="add">
        </div>
    </div>
    <AddNewChat :class="displayInfo.isAddNewChat ? 'open' : 'close'"></AddNewChat>
    <SettingsWindow :class="displayInfo.isSettingsOpen ? 'open' : 'close'"> </SettingsWindow>
</template>

<style scoped lang="scss">
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
    background-color: var(--panel);
    position: relative;
    z-index: 2;

    & .search-bar-on {
        display: grid;


        & .navigation {
            height: 65%;
        }
    }

    & .search-bar-off {
        grid-template-rows: 100%;
        transition: all .5s ease;

        & .navigation {
            height: 100%;
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
            gap: .3rem;
        }

        & .navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.5s ease;
        }
    }

    & .add-new-dialogue {
        position: absolute;
        bottom: 1rem;
        right: 1rem;

        width: 30px;
        height: 30px;

        display: flex;
        justify-content: center;

        border-radius: 50%;
        background-color: var(--button-color-hover);
        padding: 1rem;
        user-select: none;
        cursor: pointer;
        opacity: .5;
        transition: opacity .3s ease;

        &:hover {
            opacity: .8;
        }
    }

}
</style>
