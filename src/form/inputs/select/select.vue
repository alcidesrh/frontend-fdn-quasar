<template>
  <q-select
    :for="context.id"
    outlined
    v-model="value"
    option-value="id"
    option-label="label"
    :options="options"
    :multiple="context.multiple"
    dense
    bg-color="white"
    @update:model-value="handleInput"
    @filter="filterFn"
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
const options = ref();
const value = ref([]);
watchEffect(() => {
  value.value = props.context._value;
  options.value = props.context.options;
});
const model = ref();
function handleInput(e) {
  props.context.node.input(e);
}
function reset() {
  model.value = "";
  props.context.node.input("");
}
function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = props.context.options;
      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = props.context.options.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
}
</script>
