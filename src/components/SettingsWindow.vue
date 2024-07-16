<script setup lang="ts">
import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();

</script>
<template>
    <div class="container">
        <div class="settings-window">
            <div class="head">
                <div class="name">Settings</div>
                <div @click="displayInfo.closeSettings" class="close-btn">
                    <img src="/add.svg" alt="Exit">
                </div>
            </div>
            <div class="options-cover">
                <div class="settings">
                    <div class="option"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.377);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;

    & .settings-window {
        width: max(50%, 400px);
        height: max(35%, 300px);
        background-color: azure;
        border-radius: 5rem 2rem 5rem 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .head {
            width: 100%;
            display: flex;
            height: 15%;
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
                background-color: blue;
                border-radius: 2rem;
                transition: all .5s ease;

                & img {
                    transition: all .5s ease;
                    transform: rotate(45deg);
                }

                &:hover {
                    background-color: azure;

                    & img {
                        transform: rotate(135deg);
                    }
                }
            }
        }

        & .options-cover {
            display: grid;
            width: 80%;
            max-height: 85%;
            overflow-y: auto;
            align-items: flex-start;

            & .settings {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                overflow-y: auto;
                gap: .5rem;

                & .option {
                    display: flex;
                    height: 100px;
                    justify-content: flex-start;
                    align-items: center;
                    width: 95%;
                    background-color: aqua;
                }
            }
        }

    }
}
</style>