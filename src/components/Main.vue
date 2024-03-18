<script setup lang="ts">
import SidePanel from './SidePanel.vue';
import DialogueSpace from './DialogueSpace.vue';

</script>

<template>
    <div class="main-page side-panel-focus">
        <SidePanel></SidePanel>
        <DialogueSpace></DialogueSpace>
    </div>
</template>

<style scoped>
.main-page {
    display: grid;
    grid-template-columns: max(25%, 300px) min(75%, calc(100vw - 300px));
    height: 100%;
    transition: all .3s ease;
}

.side-panel-focus {
    @media screen and (max-width: 650px) {
        grid-template-columns: 100% 0;
    }
}

.dialogue-space-focus {
    @media screen and (max-width: 650px) {
        grid-template-columns: 0 100%;
    }
}
</style>
