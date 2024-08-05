<script setup lang="ts">
import { useUserStore } from "@storage";
import { ref } from 'vue';
import Option from './Settings/Option.vue';
import Head from './Settings/Head.vue';
import AccountOptions from './Settings/AccountOptions.vue';
import ThemePicker from './Settings/ThemePicker.vue';

const userStore = useUserStore();
const header = ref("Settings");
const state = ref<'settings' | 'themes' | 'accountSettings'>('settings');
const emits = defineEmits<{
    (e: 'close'): void
}>();

const back = () => {
    state.value = 'settings'
    header.value = "Settings";
};

const closeSettings = () => {
    back();
    emits('close');
};

const openAccountSettings = () => {
    if (!userStore.user)
        return
    state.value = 'accountSettings';
    header.value = userStore.user.login;
};

const openThemes = () => {
    state.value = 'themes';
    header.value = "Themes";
};
</script>

<template>
    <div class="container">
        <div class="settings-window">

            <Head :header="header" @close="closeSettings" />
            <div class="options-cover">
                <Transition>
                    <div v-if="state === 'settings'" class="settings">
                        <Option @click="openAccountSettings" name="Account" />
                        <Option @click="openThemes" name="Themes" />
                    </div>
                </Transition>
                <Transition>
                    <ThemePicker v-if="state === 'themes'" />
                </Transition>
                <Transition>
                    <AccountOptions v-if="state === 'accountSettings'" />
                </Transition>
                <Transition>
                    <div v-if="state !== 'settings'" class="back-btn" @click="back">
                        <img data-icon src="/hide-button.svg" alt="">
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import "/src/styles/animations.scss";

.v-enter-active,
.v-leave-active {
    transition: transform .5s;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(-100%);
}

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.377);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .5s ease;

    & .settings-window {
        width: max(50%, 400px);
        height: max(35%, 300px);
        background-color: var(--background);
        border-radius: 1.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem;
        animation-name: go-down;
        animation-duration: 1s;

        & .options-cover {
            display: grid;
            width: 80%;
            height: 100%;
            overflow-y: auto;
            align-items: flex-start;
            position: relative;

            & .back-btn {
                position: absolute;
                left: 0;
                z-index: 2;
                display: flex;
                border-radius: 50%;
                transition: background-color .5s ease;
                padding: .2rem;

                &:hover {
                    background-color: var(--button-color-hover);
                }
            }

            & .settings {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                transition: all .5s ease;
            }
        }
    }
}
</style>