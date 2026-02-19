<template>
  <FormKit type="form" :schema="formSchema" @submit="handleSubmit" />
</template>

<script setup>
import { ref } from "vue";
import { getFormSchema } from "src/utils/schemaParser";
import { createEntityStore } from "src/stores/dynamicEntityStore";

const props = defineProps({
  entityName: String,
  mode: { type: String, default: "create" },
  initialData: Object,
});
const store = createEntityStore(props.entityName)();
const formSchema = ref(getFormSchema(props.entityName, props.mode));

async function handleSubmit(input) {
  if (props.mode === "create") {
    await store.create(input);
  } else {
    await store.update(props.initialData.id, input);
  }
}
</script>
