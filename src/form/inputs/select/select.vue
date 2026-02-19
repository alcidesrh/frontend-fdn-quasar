<template>
  <q-select
    v-if="options"
    :for="context.id"
    outlined
    v-model="value"
    option-value="id"
    :options="options"
    :multiple="context.multiple"
    dense
    input-class="hiden"
    class="w-full capitalize"
    @update:model-value="handleInput"
    use-chips
  >
    <template #no-option>
      <div class="p-10px">No hay elementos</div>
    </template>
  </q-select>
</template>
<script setup>
const props = defineProps({
  context: Object,
});
let options = [];
// options = null;
if (props.context?.target) {
  const store = getStore(props.context?.target);
  // cl(store.items, props.context?.target);
  options = computed(() => store?.items);
} else {
  options = ref(props.context?.options);
}
const value = ref([]);
watchEffect(() => {
  value.value = props.context._value;
});
const model = ref();
function handleInput(e) {
  props.context.node.input(e);
}
function reset() {
  model.value = "";
  props.context.node.input("");
}
</script>
