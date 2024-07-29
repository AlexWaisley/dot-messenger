<script setup lang="ts">
import Option from './Option.vue';
import ChangePassword from './ChangePassword.vue';
import { ref } from 'vue';

const state = ref<'options' | 'changePassword'>('options');


const changePassw = () => {
    state.value = 'changePassword';
}
</script>

<template>
    <Transition name="slide-right">
        <div v-if="state === 'options'" class="account">
            <Option @click="changePassw" name="Change password"></Option>
        </div>
    </Transition>
    <Transition name="slide-right">
        <ChangePassword v-if="state === 'changePassword'" />
    </Transition>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform .5s;
}

.slide-right-enter,
.slide-right-leave-to {
    transform: translateX(-100%);
}

.account {
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
</style>