<script setup lang="ts">
import Main from '@components/Main.vue';
import EntryPage from '@components/EntryPage.vue';
import { useDisplayInfoStorage, useUserStore } from '@storage';

useDisplayInfoStorage();
const userStore = useUserStore();
</script>

<template>
  <Main v-if="userStore.user"></Main>
  <EntryPage v-else></EntryPage>
</template>