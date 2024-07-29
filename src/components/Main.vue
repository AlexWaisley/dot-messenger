<script setup lang="ts">
import SidePanel from './SidePanel.vue';
import DialogueSpace from './DialogueSpace.vue';
import { useDisplayInfoStorage } from "@storage";

const displayInfo = useDisplayInfoStorage();
</script>

<template>
    <div class="main-page" :class="displayInfo.isMainWithSidePanel ? 'with-side-panel' : 'without-side-panel'">
        <SidePanel v-if="displayInfo.isMainWithSidePanel">
        </SidePanel>

        <div v-else class="hover-me">
            <div class="side-panel">
                <SidePanel> </SidePanel>
            </div>
            <div class="img-container">
                <img data-icon src="/Arrow-bar-right.svg" alt="To right">
            </div>
        </div>
        <DialogueSpace class="dialogue-space"></DialogueSpace>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    display: grid;
    height: 100%;
}

.with-side-panel {
    @media screen and (max-width: 650px) {
        grid-template-columns: 100% 0;
    }

    @media screen and (min-width: 650px) {
        grid-template-columns: max(25%, 300px) min(75%, calc(100vw - 300px));
    }
}

.without-side-panel {
    grid-template-columns: 1fr;

    & .hover-me {
        position: absolute;
        width: min(100%, 560px);
        height: 100%;
        user-select: none;
        transition: width, transform 0.5s ease;
        display: flex;
        z-index: 3;
        transform: translateX(calc(-100% + 100px));

        & .img-container {
            height: 100%;
            max-width: 100px;
            display: flex;

            & img {
                max-width: 25%;
                opacity: .5;
                transition: transform .5s ease;
            }
        }

        & .side-panel {
            width: 100%;
            height: 100%;
            display: grid;
        }

        &:hover {
            transform: translateX(0);

            & .img-container {
                & img {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
</style>
