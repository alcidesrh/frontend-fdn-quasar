<template>

  <q-input outlined dense bg-color="white" type="number" :id="context.id" v-model="value" :value="context._value"
    :placeholder="context.placeholder" @update:model-value="handleInput" class="w-full" />
</template>
<script setup>

const props = defineProps({
  context: Object,
})
const value = ref()
function handleInput(e) {
  props.context.node.input(e.target.value)
}
function reset() {
  value.value = ''
  props.context.node.input('')
}
</script>
