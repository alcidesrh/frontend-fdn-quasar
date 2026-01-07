<script setup lang="ts">
const props = defineProps<{
  collection: Collection
  selected: number
}>()
const emit = defineEmits(['removeMultiple'])
const menu = ref()
const items = ref([

  {
    label: 'Seleccionar',
    value: 'selection',
    command: (i) => {
      props.collection.menu = 'selection'
    },
  },
  {
    label: 'Opciones',
    value: 'editar',
    command: (i) => {
      props.collection.menu = 'editar'
    },
  },

])

function toggle(event) {
  menu.value.toggle(event)
}
</script>

<template>
  <div v-if="!selected" class="card relative z-90 flex justify-center">
    <Button type="button" text aria-haspopup="true" aria-controls="overlay_menu" class="u-p-sm" @click="toggle">
      <Icon name="menu" mode="svg" aria-haspopup="true" aria-controls="overlay_menu" class="collection-menu-icon" />
    </Button>

    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="bg-surface-contrast-1">
      <template #item="{ item }">
        <div class="00 relative w-full flex cursor-pointer items-center gap-3 p-3">
          <Icon v-if="item.value == collection.menu" class="absolute" name="check" aria-haspopup="true"
            aria-controls="overlay_menu" size="20" />
          <label class="ml-30px cursor-pointer">{{ item.label }}</label>
        </div>
      </template>
    </Menu>
  </div>
  <div v-else class="card flex justify-center">
    <Button class="u-p-sm" type="button" text aria-haspopup="true" aria-controls="overlay_menu"
      @click="$emit('removeMultiple')">
      <Icon name="delete" class="text-red-400 [&>g]:stroke-3" mode="svg" />
    </Button>
  </div>
</template>

<style scoped>
.collection-menu-icon {
  color: var(--p-surface-contrast-600)
}
</style>
