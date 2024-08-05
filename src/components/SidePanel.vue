<script setup lang="ts">
import GroupsList from './SidePanel/GroupsList.vue';
import Navigation from './SidePanel/Navigation.vue';
import SearchBar from './SidePanel/SearchBar.vue';
import AddNewChat from './AdditionalWindows/AddNewChat.vue';
import SettingsWindow from './AdditionalWindows/SettingsWindow.vue';
import { ref } from 'vue'

const emits = defineEmits<{
    (e: 'change-side-panel-status'): void;
}>();

const isOpenSearchBar = ref(false);
const searchString = ref("");
const isOpenAddNewDialogue = ref(false);
const isOpenSettings = ref(false);

const changeSearchBarStatus = () => {
    isOpenSearchBar.value = !isOpenSearchBar.value;
}
</script>

<template>
    <div class="side-panel-container">
        <div :data-search-bar-status="isOpenSearchBar" class="head">
            <Navigation class="navigation" @change-search-status="changeSearchBarStatus"
                @change-side-panel-status="emits('change-side-panel-status')" @open-settings="isOpenSettings = true" />
            <SearchBar class="search-bar" :isOn="isOpenSearchBar" v-model="searchString" />
        </div>
        <GroupsList :search-string="searchString"></GroupsList>
        <div @click="isOpenAddNewDialogue = true" class="add-new-dialogue">
            <img data-icon src="/add.svg" alt="add">
        </div>
    </div>
    <Teleport to="body">
        <Transition>
            <AddNewChat @close="isOpenAddNewDialogue = false" v-if="isOpenAddNewDialogue" />
        </Transition>
        <Transition>
            <SettingsWindow @close="isOpenSettings = false" v-if="isOpenSettings" />
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.side-panel-container {
    width: 100%;
    display: grid;
    height: 100%;
    overflow-y: auto;
    grid-template-rows: max(5%, 100px) min(95%, calc(100vh - 110px));
    background-color: var(--panel);
    position: relative;

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
    }

    & .add-new-dialogue {
        position: absolute;
        bottom: 1rem;
        right: 1rem;

        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;

        border-radius: 50%;
        background-color: var(--button-color-hover);
        user-select: none;
        cursor: pointer;
        opacity: .5;
        transition: opacity .3s ease;
        padding: .2rem;

        &:hover {
            opacity: .8;
        }
    }

}
</style>
