<script setup lang="ts">
import Option from './Option.vue';
import ChangePassword from './ChangePassword.vue';
import { ref } from 'vue';

const state = ref<'options' | 'changePassword'>('options');


const changePassword = () => {
    state.value = 'changePassword';
}
</script>

<template>
    <div class="options">
        <Transition>
            <div v-if="state === 'options'" class="account">
                <Option @click="changePassword" name="Change password"></Option>
            </div>
        </Transition>
        <Transition>
            <ChangePassword v-if="state === 'changePassword'" />
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition: transform .5s;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(-100%);
}

.options {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    & .account {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow-y: auto;
        transition: all .5s ease;
    }
}
</style>