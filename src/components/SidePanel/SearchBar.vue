<script setup lang="ts">
const props = defineProps<{
    isOn: boolean
}>();
const searchString = defineModel();
</script>
<template>
    <div>
        <input :data-is-on="props.isOn" type="text" v-model="searchString" placeholder="Enter chat name...">
    </div>
</template>
<style scoped lang="scss">
input {
    padding-left: .4rem;
    height: 2rem;
    width: 95%;
    outline: none;
    border: none;
    border-radius: .7rem;
    transition: all .5s ease;
    background-color: var(--background);

    &[data-is-on="true"] {
        opacity: 1;
    }

    &[data-is-on="false"] {
        opacity: 0;
        z-index: -2;
    }
}
</style>