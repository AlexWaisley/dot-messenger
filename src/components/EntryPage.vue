<script setup lang="ts">
import { useDisplayInfoStorage, useMessengerInfoStorage } from '../storage';
import { ref } from 'vue';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

const login = ref("");
const password = ref("");

const sendRequest = async () => {
    displayInfo.loadingStatusChange();
    if (await messengerInfo.loginUser({ login: login.value, password: password.value })) {
        displayInfo.loggedIn();
    }
    displayInfo.loadingStatusChange();
}
</script>
<template>
    <div v-if="!displayInfo.isLoading" class="entry-page">
        <div class="login-block">
            <div class="form-row">
                <div class="input-data">
                    <input v-model="login" type="text" required>
                    <div class="underline"></div>
                    <label for="">Nickname:</label>
                </div>
            </div>
            <div class="form-row">
                <div class="input-data">
                    <input v-model="password" type="password" required>
                    <div class="underline"></div>
                    <label for="">Password:</label>
                </div>
            </div>

            <div class="form-row submit-btn">
                <div class="input-data">
                    <div class="inner"></div>
                    <button type="button" @click="sendRequest">Submit-btn</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loader--container">
        <div class="loader"></div>
    </div>
</template>


<style scoped lang="scss">
.entry-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader--container {
    height: 100%;
    display: grid;
    place-items: center;
}

.form-row {
    display: flex;
    margin: 32px 0;

    & .input-data {
        width: 100%;
        height: 40px;
        margin: 0 20px;
        position: relative;

        & input {
            display: block;
            width: 100%;
            height: 100%;
            border: none;
            font-size: 17px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.12);

            &:focus~label,
            &:valid~label {
                transform: translateY(-20px);
                font-size: 14px;
                color: #3498db;
            }

            &:focus~.underline:before,
            &:valid~.underline:before {
                transform: scale(1);
            }
        }

        & label {
            position: absolute;
            pointer-events: none;
            bottom: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        & .underline {
            position: absolute;
            bottom: 0;
            height: 2px;
            width: 100%;

            &::before {
                position: absolute;
                content: "";
                height: 2px;
                width: 100%;
                background: #3498db;
                transform: scaleX(0);
                transform-origin: center;
                transition: transform 0.3s ease;
            }
        }
    }
}

.submit-btn .input-data {
    overflow: hidden;
    height: 45px !important;
    width: 40% !important;

    &:hover {
        .inner {
            background-color: rgb(80, 80, 80);
        }
    }

    & .inner {
        height: 100%;
        width: 100%;
        position: absolute;
        background: gray;
        transition: all 0.4s;
    }

    button {
        background: none;
        border: none;
        color: #fff;
        font-size: 17px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        position: relative;
        z-index: 2;
    }
}

@media (max-width: 700px) {
    .container .text {
        font-size: 30px;
    }

    .container form {
        padding: 10px 0 0 0;
    }

    .container form .form-row {
        display: block;
    }

    form .form-row .input-data {
        margin: 35px 0 !important;
    }

    .submit-btn .input-data {
        width: 40% !important;
    }
}
</style>
