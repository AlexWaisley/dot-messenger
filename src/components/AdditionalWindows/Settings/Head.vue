<script setup lang="ts">
const props = defineProps<{ header: string }>();
const emits = defineEmits<{
    (e:'close'):void
}>();
</script>

<template>
    <div class="head">
        <div class="name">{{ props.header }}</div>
        <div @click="emits('close')" class="close-btn">
            <img data-icon src="/add.svg" alt="Exit">
        </div>
    </div>
</template>

<style scoped>
.head {
    width: 100%;
    display: flex;
    min-height: max(15%, 50px);
    justify-content: center;
    align-items: center;
    position: relative;

    & .name {
        font-size: 2rem;
    }

    & .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        display: flex;
        cursor: pointer;
        background-color: var(--button-color);
        border-radius: 2rem;
        transition: all .5s ease;

        & img {
            transition: all .5s ease;
            transform: rotate(45deg);
        }

        &:hover {
            background-color: var(--button-color-hover);

            & img {
                transform: rotate(135deg);
            }
        }
    }
}
</style>