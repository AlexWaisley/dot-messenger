<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from "../storage";
import { ref } from 'vue';
import { Themes, ThemeType } from '../models';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();
const open = ref(false);
const showTheme = ref(false);
const showAccountSettings = ref(false);
const showChangePass = ref(false);
const passwdWrong = ref(false);
const header = ref("Settings");
const oldPasswd = ref("");
const newPasswd = ref("");
const confPasswd = ref("");

const openThemes = () => {
    showTheme.value = true;
    open.value = true;
}

const back = () => {
    showTheme.value = false;
    showAccountSettings.value = false;
    showChangePass.value = false;
    open.value = false;
    header.value = "Settings";
}

const closeSettings = () => {
    displayInfo.closeSettings();
    showTheme.value = false;
    open.value = false;
}

const changeTheme = (theme: ThemeType) => {
    displayInfo.changeTheme(theme);
};

const openAccountSettings = () => {
    header.value = messengerInfo.user.login;
    showAccountSettings.value = true;
    open.value = true;
};

const openChangePass = () => {
    header.value = messengerInfo.user.login;
    showChangePass.value = true;
    showAccountSettings.value = false;
    open.value = true;
};

const tryChangePassword = () => {
    if (newPasswd.value === confPasswd.value) {
        passwdWrong.value = false;
        messengerInfo.changePassword(oldPasswd.value, newPasswd.value);
        oldPasswd.value = "";
        newPasswd.value = "";
        confPasswd.value = "";
    }
    else {
        passwdWrong.value = true;
    }
}
</script>
<template>
    <div class="container">
        <div class="settings-window">
            <div class="head">
                <div class="name">{{ header }}</div>
                <div @click="closeSettings()" class="close-btn">
                    <img data-icon src="/add.svg" alt="Exit">
                </div>
            </div>
            <div class="options-cover">
                <div :class="open ? 'show' : 'hide'" class="back-btn" @click="back">
                    <img data-icon src="/hide-button.svg" alt="">
                </div>
                <div :class="open ? 'hide' : 'show'" class="settings">
                    <div class="option" @click="openAccountSettings">
                        <span>Account</span>
                        <img data-icon src="/hide-button.svg" alt="">
                    </div>
                    <div class="option" @click="openThemes">
                        <span>Themes</span>
                        <img data-icon src="/hide-button.svg" alt="">
                    </div>
                </div>
                <div :class="showTheme ? 'show-themes' : 'hide-themes'" class="themes">
                    <div v-for="theme in Themes" :class="theme" @click="changeTheme(theme)">
                        <div class="circle-demonstration">
                        </div>
                    </div>
                </div>
                <div :class="showAccountSettings ? 'show-account' : 'hide-account'" class="account">
                    <div class="option" @click="openChangePass">
                        <span> Change password </span>
                    </div>
                </div>
                <div :class="showChangePass ? 'show-change-pass' : 'hide-change-pass'" class="change-pass">
                    <div class="change-pass">
                        <div class="inputs">
                            <label class="label">
                                <input v-model="oldPasswd" type="password" required>
                                <span class="placeholder">Old password:</span>
                            </label>
                            <label class="label">
                                <input v-model="newPasswd" type="password" required>
                                <span class="placeholder">New password:</span>
                            </label>
                            <label class="label">
                                <input :class="passwdWrong ? 'wrong' : ''" v-model="confPasswd"
                                    v-on:keyup.enter="tryChangePassword" type="password" required>
                                <span class="placeholder">Confirm password:</span>
                            </label>
                        </div>
                        <div class="btn" @click="tryChangePassword">Submit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
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
    transition: all .5s ease;

    & .settings-window {
        width: max(50%, 400px);
        height: max(35%, 300px);
        background-color: var(--background);
        border-radius: 1.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem;

        & .head {
            width: 100%;
            display: flex;
            height: 15%;
            justify-content: center;
            align-items: center;
            position: relative;

            & .name {
                font-size: 2rem;
            }

            & .close-btn {
                position: absolute;
                top: 0;
                right: 0;
                width: 50px;
                height: 50px;
                display: flex;
                cursor: pointer;
                background-color: var(--button-color);
                border-radius: 2rem;
                transition: all .5s ease;

                & img {
                    transition: all .5s ease;
                    transform: rotate(45deg);
                }

                &:hover {
                    background-color: var(--button-color-hover);

                    & img {
                        transform: rotate(135deg);
                    }
                }
            }
        }

        & .options-cover {
            display: grid;
            width: 80%;
            height: 100%;
            overflow-y: auto;
            align-items: flex-start;
            position: relative;
            overflow: hidden;

            & .change-pass {
                position: absolute;
                right: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                transition: all .5s ease;
                flex-direction: column;

                & .inputs {
                    position: absolute;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                }

                & .btn {
                    height: 20%;
                    width: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: .5rem;
                    z-index: 2;
                    cursor: pointer;
                    transition: all .5s ease;
                    background-color: var(--button-color);

                    &:hover {
                        background-color: var(--button-color-hover);
                    }
                }
            }

            & .account {
                position: absolute;
                right: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                transition: all .5s ease;

                & .option {
                    display: flex;
                    height: 100px;
                    justify-content: center;
                    align-items: center;
                    width: 95%;
                    background-color: var(--button-color);
                    cursor: pointer;

                    & img {
                        position: absolute;
                        width: 30px;
                        right: 5%;
                        transform: rotate(180deg);
                    }

                    &:hover {
                        background-color: var(--button-color-hover);
                    }
                }
            }

            & .themes {
                position: absolute;
                right: 0;
                width: 100%;
                height: 100%;
                transition: all .5s ease;
                display: flex;
                flex-wrap: wrap;
                gap: .5rem;
                justify-content: center;
                align-items: center;

                & * {
                    height: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20%;

                    & .circle-demonstration {
                        min-width: 80px;
                        min-height: 80px;
                        background-color: var(--background);
                        aspect-ratio: 1/1;
                        cursor: pointer;
                        border-radius: 50%;
                        border: black solid 1px;
                    }
                }
            }

            & .back-btn {
                position: absolute;
                left: 0%;
                z-index: 2;
            }

            & .show,
            & .show-themes,
            & .show-account,
            & .show-change-pass {
                transition: all .5 ease;
                transform: translateX(0%);
            }

            & .hide {
                transition: all .5 ease;
                transform: translateX(-120%);
            }

            & .hide-themes,
            & .hide-account,
            & .hide-change-pass {
                transition: all .5 ease;
                transform: translateX(120%);
            }


            & .settings {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                overflow-y: auto;
                gap: .5rem;
                transition: all .5s ease;

                & .option {
                    display: flex;
                    height: 100px;
                    justify-content: center;
                    align-items: center;
                    width: 95%;
                    background-color: var(--button-color);
                    cursor: pointer;

                    & img {
                        position: absolute;
                        width: 30px;
                        right: 5%;
                        transform: rotate(180deg);
                    }

                    &:hover {
                        background-color: var(--button-color-hover);
                    }
                }
            }
        }

    }
}
</style>