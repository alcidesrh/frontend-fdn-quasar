<template>
  <Suspense>
    <List />

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script setup lang="ts">
import List from 'components/user/UserList.vue';
</script>
