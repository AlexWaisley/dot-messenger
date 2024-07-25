<script setup lang="ts">
import SidePanel from './SidePanel.vue';
import DialogueSpace from './DialogueSpace.vue';
import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();
</script>

<template>
    <div class="main-page" :class="displayInfo.isMainWithSidePanel ? 'with-side-panel' : 'without-side-panel'">
        <SidePanel v-if="displayInfo.isMainWithSidePanel">
        </SidePanel>

        <div v-else class="hover-me">
            <div class="img-container">
                <img data-icon src="/Arrow-bar-right.svg" alt="To right">
            </div>
            <div class="side-panel">
                <SidePanel> </SidePanel>
            </div>
        </div>
        <DialogueSpace class="dialogue-space"></DialogueSpace>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    display: grid;
    height: 100%;
    transition: all .3s ease;
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
        width: 100px;
        height: 100%;
        user-select: none;
        transition: all 0.5s ease;
        display: flex;
        flex-direction: row-reverse;
        z-index: 3;

        & .img-container {
            height: 100%;
            max-width: 100px;
            display: flex;
            justify-self: center;
            transition: all 0.5s ease;

            & img {
                max-width: 20%;
                opacity: .5;
                transition: all .5s ease;
            }
        }

        & .side-panel {
            width: 100%;
            height: 100%;
            left: 0;
            display: grid;
            transition: all 0.5s ease;
            transform: translate(-100%);
        }

        &:hover {
            width: min(100%, 560px);

            & .side-panel {
                transform: translate(0%);
            }

            & .img-container {
                & img {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
</style>
