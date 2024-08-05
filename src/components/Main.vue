<script setup lang="ts">
import SidePanel from './SidePanel.vue';
import DialogueSpace from './Dialog.vue';
import { useMessengerInfoStorage } from '@storage';
import { ref, watch } from 'vue';

const messengerInfo = useMessengerInfoStorage();

const isMainWithSidePanel = ref(true);

watch(() => messengerInfo.currentChat, (chat) => {
    if (chat && window.innerWidth < 650) {
        isMainWithSidePanel.value = false;
    }
})

const changeSidePanelStatus = () => {
    isMainWithSidePanel.value = !isMainWithSidePanel.value
}
</script>

<template>
    <div class="main-page" :data-side-panel="!isMainWithSidePanel">
        <div class="panel-container">
            <div class="side-panel">
                <SidePanel @change-side-panel-status="changeSidePanelStatus" />
            </div>
            <div v-if="!isMainWithSidePanel" class="img-container">
                <img data-icon src="/Arrow-bar-right.svg" alt="To right">
            </div>
        </div>
        <DialogueSpace class="dialogue-space" />
    </div>
</template>

<style scoped lang="scss">
.main-page {
    display: grid;
    height: 100%;

    &[data-side-panel="false"] {
        @media screen and (max-width: 650px) {
            grid-template-columns: 100% 0;
        }

        @media screen and (min-width: 650px) {
            grid-template-columns: max(25%, 300px) min(75%, calc(100vw - 300px));
        }

        & .panel-container {
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            width: 100%;

            & .side-panel {
                width: 100%;
                height: 100%;
                display: grid;
            }
        }
    }


    &[data-side-panel="true"] {
        grid-template-columns: 1fr;

        & .panel-container {
            position: absolute;
            width: min(80%, 560px);

            height: 100%;
            user-select: none;
            transition: width,
                transform 0.5s ease;
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

}
</style>
