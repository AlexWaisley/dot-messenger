<script setup lang="ts">
import Main from './components/Main.vue';
import EntryPage from './components/EntryPage.vue';
import { useDisplayInfoStorage, useMessengerInfoStorage } from './storage';
import { onMounted } from 'vue';

const displayInfo = useDisplayInfoStorage();
const messengerInfo = useMessengerInfoStorage();

onMounted(async () => {
  if (await messengerInfo.checkUserLogedIn()) {
    displayInfo.loggedIn();
  }
})

</script>

<template>
  <EntryPage v-if="!displayInfo.isUserLoggedIn"></EntryPage>
  <Main v-else></Main>
</template>

<style scoped></style>
