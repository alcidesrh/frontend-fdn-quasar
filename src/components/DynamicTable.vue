<template>
  <q-table
    :rows="store.items"
    :columns="columns"
    row-key="id"
    :loading="store.loading"
    :pagination.sync="pagination"
    @request="handleRequest"
  >
    <template v-slot:top>
      <!-- Filtros dinámicos -->
      <q-input
        v-for="filter in searchFilters"
        :key="filter.field"
        v-model="filters[filter.field]"
        :label="filter.field"
      />
      <q-select
        v-if="orderFilters.length"
        v-model="orders"
        :options="orderOptions"
        multiple
        emit-value
        map-options
        label="Orden"
      />
      <q-input
        v-for="date in dateFilters"
        :key="date.field"
        v-model="filters[date.field]"
        type="date"
        :label="date.field"
      />
      <q-toggle
        v-for="bool in booleanFilters"
        :key="bool.field"
        v-model="filters[bool.field]"
        :label="bool.field"
      />
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getFilterConfig } from 'src/utils/schemaParser';
import { createEntityStore } from 'src/stores/dynamicEntityStore';

const props = defineProps({ entityName: String });
const store = createEntityStore(props.entityName)();
const filterConfig = getFilterConfig(props.entityName);

const filters = ref({});
const orders = ref([]);
const pagination = ref({ rowsPerPage: 10, page: 1 });

const searchFilters = computed(() => filterConfig.search || []);
const orderFilters = computed(() => filterConfig.order || []);
const dateFilters = computed(() => filterConfig.date || []);
const booleanFilters = computed(() => filterConfig.boolean || []);

const orderOptions = computed(() => orderFilters.value.map(f => ({ label: `${f.field} ASC`, value: { field: f.field, direction: 'ASC' } }, { label: `${f.field} DESC`, value: { field: f.field, direction: 'DESC' } })));

const columns = computed(() => store.fields.map(field => ({ name: field, label: field, field, sortable: orderFilters.value.some(o => o.field === field) })));

async function handleRequest({ pagination: pag }) {
  await store.fetchList(filters.value, orders.value, { first: pag.rowsPerPage, after: /* calcular based on page */ });
}

onMounted(async () => {
  await store.fetchList();
});
</script>
