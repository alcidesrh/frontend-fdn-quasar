<template>

  <div v-for="(v, i) in items" :key="i" class="flex justify-center my-20px cursor-pointer">
    <q-icon :name="v.icon" size="28px" class="slate-6" @mouseover="onHover(true, i)">
      <SubMenuMini v-if="v.children" :toogle="flags[i]" :items="v.children" />
    </q-icon>
  </div>

</template>

<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
const props = defineProps({
  items: {
    type: Array<any>,
    default: null,
  }
})
const hover = ref(false)
const flags = ref(Array.from({ length: props.items.length }, () => false))
function onHover(hovered, i) {
  flags.value[i] = hovered
}
</script>
<style>
.active {
  scale: 1.5;
}
</style>
`
