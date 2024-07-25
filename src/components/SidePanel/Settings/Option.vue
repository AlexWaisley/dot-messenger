<script setup lang="ts">
const props = defineProps<{
    name: string,
}>();
</script>
<template>
    <div class="option">
        <span>{{ props.name }}</span>
        <img data-icon src="/hide-button.svg" alt="">
    </div>
</template>
<style scoped lang="scss">
.option {
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
</style>