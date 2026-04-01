<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'route'" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </RouterView>
</template>
