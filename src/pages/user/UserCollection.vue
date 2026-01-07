<script setup lang="ts">
const store = useUserStore()
</script>

<template>
  <div>
    <collection :store="store" field="username" />
  </div>
</template>
