<template>

  <q-menu persistent v-model="open" anchor="top right" self="top left" @mouseleave="onHover(false, i)">
    <q-list style="min-width: 100px">
      <q-item v-for="v, i in v.children" :key="i" clickable>
        <q-item-section>
          {{ v.label }}
        </q-item-section>
        <q-item-section side v-if="v.children">
          <icon name="keyboard_arrow_right" />
        </q-item-section>
        <!-- <MenuMini v-if="v.children" :items="v.children" /> -->
        <SubMenuMini v-if="v.children" :open="flags[i]" :items="v.children" />
      </q-item>
    </q-list>
  </q-menu>

</template>

<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
const props = defineProps({
  items: {
    type: Array<any>,
    default: null,
  },
  toogle: {
    type: Boolean,
    default: false,
  }
})
const open = ref(false);
watch(() => props.toogle, (v) => {
  open.value = v
})
const flags = ref(Array.from({ length: props.items.length }, () => ref(false)))
function onHover(hovered, i) {
  flags.value[i] = true
}
</script>
<style>
.active {
  scale: 1.5;
}
</style>
`
