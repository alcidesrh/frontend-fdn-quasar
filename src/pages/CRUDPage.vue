<!-- src/pages/CRUDPage.vue -->
<template>
  <div class="q-pa-md">
    <!-- <q-table
      :rows="items"
      :columns="dynamicColumns"
      row-key="id"
      @request="fetchData"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Nuevo" @click="openForm('create')" />
      </template>
      <template #loading></template>
    </q-table> -->
    <q-btn color="primary" label="Nuevo" @click="openForm('create')" />
    <q-dialog v-model="formDialog">
      <q-card>
        <q-card-section>
          <FormKit type="form" @submit="handleFormSubmit" :actions="false">
            <FormKitSchema :schema="formSchema" />
          </FormKit>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRoute } from "vue-router";
import { defineStore, getActivePinia, storeToRefs } from "pinia";
import queryBuilder from "gql-query-builder";
import gql from "graphql-tag";
import { FormKitSchema, FormKit } from "@formkit/vue";

const instance = getCurrentInstance(); // Access Vue instance for global properties
const apolloClient = instance.appContext.config.globalProperties.$apollo;

const route = useRoute();
const entity = route.meta.entity;
const storeId = `${entity.toLowerCase()}Store`;

const pinia = getActivePinia();

if (!pinia || !pinia._s.has(storeId)) {
  throw new Error(
    `Store "${storeId}" not found. Ensure introspection completed successfully.`,
  );
}

const useEntityStore = defineStore(storeId);
const store = useEntityStore();
// console.log(store, 999);
const items = computed(() => store.items);
// const pagination = ref(store.pagination);
// const filters = ref(store.filters);
const formDialog = ref(false);
const formSchema = ref([]);

// Generate dynamic columns based on schema fields (assume typeSchema available)
const dynamicColumns = ref([]); // Implement generation, e.g., onMounted: dynamicColumns.value = typeSchema.fields.map(f => ({ name: f.name, label: capitalize(f.name), field: f.name }));

const typeSchema = getTypeSchema(entity);

onMounted(() => {
  fetchData();
  dynamicColumns.value = store.fields.map((f) => ({
    name: f.name,
    label: f.name,
    field: f.name,
  }));
});

async function fetchData() {
  await store.fetchItems(apolloClient); // Use apolloClient instead of app...
  cl(pinia);
}

function openForm(mode) {
  formSchema.value = store.form();
  formDialog.value = true;
}

async function handleFormSubmit(data) {
  const mutation = queryBuilder.mutation({
    operation: mode === "create" ? `create${entity}` : `update${entity}`,
    variables: { input: { value: data, type: `${entity}Input` } },
    fields: ["id"],
  });

  await apolloClient.mutate({ mutation: gql(mutation.mutation) }); // Use apolloClient
  formDialog.value = false;
  fetchData();
}

// Placeholder for getTypeSchema and capitalize (implement as needed)
function getTypeSchema(entityName) {
  return {}; // Retrieve from global schema store
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>
