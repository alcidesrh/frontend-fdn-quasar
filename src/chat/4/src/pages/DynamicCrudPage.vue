
<template>
  <q-page padding>
    <q-table
      :rows="store.items"
      :columns="columns"
      row-key="id"
      :loading="store.loading"
      @request="onRequest"
    />

    <FormKitSchema :schema="formSchema" />
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { registry } from '../core/registry/schemaRegistry'
import { generateFormSchema } from '../core/generators/formkitGenerator'

const route = useRoute()
const entity = route.params.entity

const entry = registry.get(entity)
const store = entry.store()

store.fetch()

const columns = computed(() =>
  entry.type.fields.map(f => ({
    name: f.name,
    label: f.name,
    field: f.name
  }))
)

const formSchema = generateFormSchema(entry.type)

function onRequest(props) {
  store.page = props.pagination.page
  store.fetch()
}
</script>
