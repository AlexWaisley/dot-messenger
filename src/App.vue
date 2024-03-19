<script setup lang="ts">
import Main from './components/Main.vue';
import EntryPage from './components/EntryPage.vue';
import { useDisplayInfoStorage } from './storage/displayInfo';

const displayInfo = useDisplayInfoStorage();

</script>

<template>
  <EntryPage v-if="!displayInfo.isUserLoggedIn"></EntryPage>
  <Main v-else></Main>
</template>

<style scoped></style>
