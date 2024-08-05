<script setup lang="ts">
import { useUserStore } from '@storage';
import { ref } from 'vue';
import InputField from './InputField.vue';
import { LoginRequest } from '@models';

const userStore = useUserStore();

const state = ref<LoginRequest>({ login: "", password: "" });
const isLoading = ref(false);

const logIn = async () => {
    isLoading.value = true;
    await userStore.loginUser(state.value)
    isLoading.value = false;
}

const register = async () => {
    isLoading.value = true;
    await userStore.registerNewUser(state.value)
    isLoading.value = false;
}

</script>
<template>
    <div v-if="isLoading" class="loader--container">
        <div class="loader"></div>
    </div>
    <div v-else class="entry-page">
        <form @submit.prevent="logIn" class="login-block">
            <div class="input-fields">
                <InputField placeholder="Nickname" type="text" v-model="state.login" />
                <InputField placeholder="Password" type="password" v-model="state.password" />
            </div>
            <div class="submit-btns">
                <button type="button" @click="register">Register</button>
                <button type="submit">Login</button>
            </div>
        </form>
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
