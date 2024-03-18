<script setup lang="ts"></script>

<template>
    <div class="chat-preview-container">
        <div class="avatar-container">
            <div class="image-wrapper">
                <img src="/04856.jpg" alt="someImg">
            </div>
        </div>
        <div class="text-container">
            <div class="chat-info">
                <div class="user-nick">NickNadfsdsfdsfdsdsfsfme</div>
                <div class="last-message-info">
                    <div class="time">11:00</div>
                    <div class="status">reaD</div>
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
    width: 100%;
    height: 150px;
    transition: all .3s ease;

    & .avatar-container {
        display: flex;
        justify-content: center;
        height: 100px;
        aspect-ratio: 1/1;

        & .image-wrapper {
            height: 100%;

            & img {
                height: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }
    }

    & .text-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;

        & .chat-info {
            max-width: 100%;
            padding: .1rem;
            display: grid;
            grid-template-columns: 5fr 1fr;

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