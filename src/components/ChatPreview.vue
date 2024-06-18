<script setup lang="ts">
import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();
</script>

<template>
    <div @click="displayInfo.openDialogue" class="chat-preview-container">
        <div class="avatar-container">
            <div class="image-wrapper">
                <img src="/04856.jpg" alt="someImg">
            </div>
        </div>
        <div class="text-container">
            <div class="chat-info">
                <div class="user-nick">NickNadfsdsfdsfdsdasdasasdasdasdasdsfdsdfgsfdgsfdgfdsgsfsfme</div>
                <div class="last-message-info">
                    <div class="time">11:00</div>
                </div>
            </div>
            <div class="last-message-container">
                <div class="content">I love BBC I love BBC I love BBC I love BBC I love BBC I love BBC I love BBC </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.chat-preview-container {
    display: flex;
    max-width: 100%;
    height: 150px;
    transition: all .3s ease;
    gap: .5rem;
    border-radius: .5rem;

    & .avatar-container {
        display: flex;
        height: 100px;
        width: 20%;
        justify-content: center;

        & .image-wrapper {
            height: 100%;

            & img {
                height: 100%;
                max-width: 100%;
                object-fit: contain;
            }
        }
    }

    & .text-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;

        & .chat-info {
            max-width: 100%;
            padding: .1rem;
            display: flex;
            flex-direction: column;

            & .last-message-info {
                display: flex;
                flex-direction: column;
                min-width: 40px;
            }

            & .user-nick {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        & .last-message-container {
            display: grid;
            justify-content: space-between;
            height: 40%;
            width: 100%;

            & .content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
    }

    &:hover {
        background-color: azure;
    }
}
</style>