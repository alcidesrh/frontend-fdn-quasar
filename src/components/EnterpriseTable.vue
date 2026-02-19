
<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :loading="loading"
    row-key="id"
    :pagination="pagination"
    @request="onRequest"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rows: Array,
  fields: Array,
  loading: Boolean,
  total: Number,
  store: Object
})

const columns = computed(() =>
  props.fields.map(f => ({
    name: f.name,
    label: f.name,
    field: f.name,
    sortable: true
  }))
)

const pagination = computed(() => ({
  page: props.store.page,
  rowsPerPage: props.store.itemsPerPage,
  rowsNumber: props.total
}))

async function onRequest(propsReq) {
  props.store.page = propsReq.pagination.page
  props.store.itemsPerPage = propsReq.pagination.rowsPerPage
  await props.store.fetch()
}
</script>
