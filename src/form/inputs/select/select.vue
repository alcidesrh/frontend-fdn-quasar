<template>
  <q-select outlined v-model="model" :options="context.options" label="Outlined" dense class="w-full">
    <template #no-option></template>
  </q-select>
</template>
<script setup>

const props = defineProps({
  context: Object,
})
const model = ref()
function handleInput(e) {
  props.context.node.input(e.target.value)
}
function reset() {
  model.value = ''
  props.context.node.input('')
}
</script>
