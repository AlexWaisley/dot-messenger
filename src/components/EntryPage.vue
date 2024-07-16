<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from '../storage';
import { ref } from 'vue';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const login = ref("");
const password = ref("");

const logIn = async () => {
    displayInfo.loadingStatusChange();
    if (await messengerInfo.loginUser({ login: login.value, password: password.value })) {
        displayInfo.loggedIn();
    }
    displayInfo.loadingStatusChange();
}

const register = async () => {
    displayInfo.loadingStatusChange();
    if (await messengerInfo.registerNewUser({ login: login.value, password: password.value })) {
        displayInfo.loggedIn();
    }
    displayInfo.loadingStatusChange();
}
</script>
<template>
    <div v-if="!displayInfo.isLoading" class="entry-page">
        <div class="login-block">
            <div class="input-fields">
                <label class="label">
                    <input v-model="login" type="text" v-on:keyup.enter="logIn()" required>
                    <span class="placeholder">Nickname:</span>
                </label>
                <label class="label">
                    <input v-model="password" v-on:keyup.enter="logIn()" type="password" required>
                    <span class="placeholder">Password:</span>
                </label>
            </div>

            <div class="submit-btns">
                <div class="register btn">
                    <button type="button" @click="register">Register</button>
                </div>
                <div class="login btn">
                    <button type="button" @click="logIn">Login</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loader--container">
        <div class="loader"></div>
    </div>
</template>


<style scoped lang="scss">
@import '../styles/variables.scss';

.entry-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background;

    & .login-block {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        & .input-fields {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        & .submit-btns {
            display: flex;
            width: 100%;
            justify-content: space-between;


            & button {
                padding: .5rem;
                background: $button-color;
                border: none;
                color: $text-color;
                font-size: 17px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                border-radius: .4rem;
                transition: all .5s ease;

                &:hover {
                    background: $button-color-hover;
                }
            }
        }
    }
}

.loader--container {
    height: 100%;
    display: grid;
    place-items: center;
}
</style>
