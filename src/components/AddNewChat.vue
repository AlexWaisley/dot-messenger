<script setup lang="ts">
import { useDisplayInfoStorage } from "../storage/displayInfo";

const displayInfo = useDisplayInfoStorage();

</script>
<template>
    <div class="container">
        <div class="new-chat-window">
            <div class="input-fields-container">
                <div class="chat-name-field">
                    <label class="label">
                        <input class="input" name="chat-name" type="text" required>
                        <span class="placeholder">Enter chat name</span>
                    </label>
                </div>
                <div class="opponent-nickname-field">
                    <label class="label">
                        <input class="input" name="opponent-nickname" type="text" required>
                        <span class="placeholder">Enter opponent nickname</span>
                    </label>
                </div>
            </div>
            <div class="action-buttons">
                <div @click="displayInfo.closeNewDialogueWindow" class="cancel-btn">CANCEL</div>
                <div @click="displayInfo.closeNewDialogueWindow" class="submit-btn">SUBMIT</div>
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
    display: grid;
    place-items: center;
    transition: all .5s ease;

    & .new-chat-window {
        width: max(50%, 400px);
        height: max(50%, 200px);
        background-color: azure;
        border-radius: 5rem;
        display: grid;
        grid-template-rows: 4fr 1fr;

        & .input-fields-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;

            & .chat-name-field,
            & .opponent-nickname-field {
                display: flex;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                align-items: center;

                gap: .5rem;

                & .label {
                    position: relative;
                    padding-top: 20px;
                    font-size: 20px;

                    & .placeholder {
                        position: absolute;
                        left: 12px;
                        font-size: 20px;
                        top: calc(50% - 3px);
                        transition: all 0.5s ease;
                    }

                    & input {
                        border: none;
                        appearance: none;
                        padding: 12px;
                        font-size: 20px;
                        width: 100%;
                        border-radius: .4rem .4rem 0 0;
                        outline: none;
                        background: linear-gradient(90deg, #222, #222) left bottom/0 2px no-repeat, linear-gradient(90deg, #ccc, #ccc) left bottom/100% 2px no-repeat, linear-gradient(90deg, #fafafa, #fafafa) left bottom/100% no-repeat;
                        transition: all 0.5s ease;

                        &:valid,
                        &:focus {
                            background-size: 100% 2px, 100% 2px, 100%;
                        }

                        &:valid+.placeholder,
                        &:focus+.placeholder {
                            top: 3px;
                            font-size: 14px;
                            color: #222;
                        }
                    }
                }
            }
        }

        & .action-buttons {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: space-around;

            & .cancel-btn,
            & .submit-btn {
                background-color: green;
                height: 50%;
                width: 40%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: .5rem;
                cursor: pointer;
                transition: all .5s ease;

                &:hover {
                    background-color: darkgreen;
                }
            }
        }
    }
}
</style>