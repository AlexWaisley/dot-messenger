<script setup lang="ts">
import Chat from './Chat.vue'
</script>

<template>
    <div class="dialogue-container">
        <!-- <div class="no-dialogue">
            No dialogue picked
        </div> -->
        <div class="dialogue">
            <div class="chat-header">
                <div class="back-btn"><span>B</span></div>
                <div class="person">
                    <div class="nickname">
                        <span>NickNadfsdsfdsfdsdsfsfme</span>
                    </div>
                </div>
            </div>
            <div class="chat">
                <Chat></Chat>
            </div>
            <div class="input-field">
                <div class="input-container">
                    <input type="text" placeholder="Enter text..." />
                </div>
                <div class="send-btn">Send</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialogue-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    background-color: #f4f4f4;

    & .dialogue {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 5% 85% 10%;

        & .chat-header {
            background-color: azure;
            display: grid;
            grid-template-columns: 10% 90%;
            place-items: center;
            font-weight: 600;
            font-size: 1.5rem;
            padding: 0 .5rem;

            & .back-btn {
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                padding: .25rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all .3s ease;

                &:hover {
                    background-color: rgb(234, 234, 234);
                }
            }
        }

        & .chat {
            display: flex;
            padding-left: .5rem;
        }

        & .input-field {
            display: flex;
            justify-content: space-between;
            border-radius: 1rem;
            gap: .5rem;
            padding: 1rem;
            margin: 0 .5rem;
            align-items: center;
            background-color: #ebebeb;

            & .input-container {
                width: 100%;
                display: flex;
                justify-content: center;

                & input {
                    padding: 1rem;
                    height: 2rem;
                    font-size: 1.25rem;
                    width: 100%;
                    outline: none;
                    border: 0;
                }
            }

            .send-btn {
                background-color: rgb(247, 247, 247);
                height: 4.25rem;
                aspect-ratio: 1/1;
                cursor: pointer;
                display: grid;
                place-content: center;
                transition: all .2s ease;
                border-radius: 50%;

                &:hover {
                    background-color: #e8e8e8;
                }
            }
        }
    }
}
</style>
