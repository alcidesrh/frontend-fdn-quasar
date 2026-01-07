<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 10,
  },
  columns: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <div v-for="(column, j) in Number(columns)" :key="j" class="min-w-20rem">
    <skeleton v-for="(column, i) in Number(rows)" :key="i" class="u-m-l" height="2rem" />
  </div>
</template>
