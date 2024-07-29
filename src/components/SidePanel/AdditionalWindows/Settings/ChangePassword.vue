<script setup lang="ts">
import { ref } from 'vue';
import { useMessengerInfoStorage } from "@storage";
import InputField from '@components/InputField.vue';

const messengerInfo = useMessengerInfoStorage();

const oldPasswd = ref("");
const newPasswd = ref("");
const confPasswd = ref("");
const passwdWrong = ref(false);

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
    <div class="change-pass">
        <div class="inputs">
            <InputField placeholder="Old password" type="text" v-model:inputModel="oldPasswd" />
            <InputField placeholder="New password" type="text" v-model:inputModel="newPasswd" />
            <InputField :class="passwdWrong ? 'wrong' : ''" placeholder="Confirm password" type="text"
                :func="tryChangePassword" v-model:inputModel="confPasswd" />
        </div>
        <button @click="tryChangePassword">Submit</button>
    </div>
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