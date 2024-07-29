<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from '@storage';
import { ref } from 'vue';
import InputField from './InputField.vue';

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
                <InputField placeholder="Nickname" type="text" :func="logIn" v-model:inputModel="login" />
                <InputField placeholder="Password" type="password" :func="logIn" v-model:inputModel="password" />
            </div>
            <div class="submit-btns">
                <button type="button" @click="register">Register</button>
                <button type="button" @click="logIn">Login</button>
            </div>
        </div>
    </div>
    <div v-else class="loader--container">
        <div class="loader"></div>
    </div>
</template>


<style scoped lang="scss">
@import '../styles/animations.scss';

.entry-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background);

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
        }
    }
}

.loader--container {
    height: 100%;
    display: grid;
    place-items: center;
    background-color: var(--background);


    .loader {
        border: 5px solid --panel;
        border-radius: 50%;
        border-top: 5px solid var(--scroll-color);
        width: 120px;
        height: 120px;
        -webkit-animation: spin $infinite-animation;
        animation: spin $infinite-animation;
    }
}
</style>
