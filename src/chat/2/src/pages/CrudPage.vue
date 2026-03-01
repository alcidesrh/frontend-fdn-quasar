
<template>
  <q-page padding>
    <q-table :rows="store.items" :columns="columns" row-key="id" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { createCrudStore } from '../stores/dynamicCrudStore'

const $q = useQuasar()
const store = createCrudStore('users', $q.app.config.globalProperties.$apollo)()

const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'name', label: 'Name', field: 'name' }
]

store.fetchAll()
</script>
