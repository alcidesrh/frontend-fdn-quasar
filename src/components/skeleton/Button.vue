<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 1,
  },
  columns: {
    type: Number,
    default: 1,
  },
  class: {
    type: String,
    default: 'ml-auto',
  },
})
</script>

<template>
  <skeleton v-for="(column, i) in Number(columns * rows)" :key="i" class="max-w-107px u-my-s" height="2rem" />
</template>
