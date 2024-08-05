<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from "@storage";
import InputField from '@components/InputField.vue';

const userStore = useUserStore();

const newPasswd = ref("");
const confPasswd = ref("");
const passwdWrong = ref(false);

const tryChangePassword = () => {
    if (newPasswd.value === confPasswd.value) {
        passwdWrong.value = false;
        userStore.changePassword(newPasswd.value);
        newPasswd.value = "";
        confPasswd.value = "";
    }
    else {
        passwdWrong.value = true;
    }
}

</script>
<template>
    <form @submit.prevent="tryChangePassword" class="change-pass">
        <div class="inputs">
            <InputField placeholder="New password" type="password" v-model="newPasswd" />
            <InputField placeholder="Confirm password" type="password" v-model="confPasswd" :data-wrong="passwdWrong" />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
<style scoped lang="scss">
.change-pass {
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
</style>