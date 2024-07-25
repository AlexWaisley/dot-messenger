<script setup lang="ts">
const props = defineProps<{
    placeholder: string,
    type: string,
    func?: () => void
}>();

const inputText = defineModel('inputModel', { required: true });
</script>

<template>
    <label class="label">
        <input v-model="inputText" v-on:keyup.enter="props.func" :type="props.type" required>
        <span class="placeholder">{{ props.placeholder }}</span>
    </label>
</template>

<style scoped lang="scss">
.label {
    position: relative;
    padding-top: 20px;
    font-size: 20px;

    & .placeholder {
        position: absolute;
        left: 12px;
        font-size: 20px;
        top: calc(50% - 3px);
        transition: all 0.5s ease;
    }

    & input {
        border: none;
        appearance: none;
        padding: 12px;
        font-size: 20px;
        max-width: 100%;
        border-radius: .4rem .4rem 0 0;
        outline: none;
        background: linear-gradient(90deg, #222, #222) left bottom/0 2px no-repeat, linear-gradient(90deg, var(--background), var(--background)) left bottom/100% 2px no-repeat, linear-gradient(90deg, var(--background), var(--background)) left bottom/100% no-repeat;
        transition: all 0.5s ease;

        &:valid,
        &:focus {
            background-size: 100% 2px, 100% 2px, 100%;
        }

        &:valid+.placeholder,
        &:focus+.placeholder {
            top: 3px;
            font-size: 14px;
            color: var(--text-color);

        }
    }
}
</style>