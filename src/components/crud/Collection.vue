<template>
  <div>
    <div v-if="entity.collection.columns.length" class="relative ">
      <FormKit v-model="entity.collection.filters" type="form" :actions="false" form-class="block m-auto"
        :config="{ wrapperClass: 'mb-0!' }">
        <q-table :grid="$q.screen.xs" :dense="$q.screen.lt.md" class="sticky-header-table" title="Treats"
          :rows="entity.collection.items" :columns="entity.collection.columns" row-key="id"
          v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort @request="onRequest">
          <template v-slot:top>
            <q-btn color="primary" label="Add row" @click="" />
            <q-btn class="q-ml-sm" color="primary" label="Remove row" @click="" />
            <q-space />
            <q-input borderless dense debounce="300" color="primary">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props" class="h-30px!">
              <q-th v-for="col in props.cols" :key="col.name" :props="props"
                class="text-fluid-0! font-medium! text-left! text-slate-7" :class="[col?.class]">
                <span>{{ col.label }}</span>
              </q-th>
            </q-tr>
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props"
                class="text-fluid--1! font-normal! text-left! col-wraper" :class="[col?.class]">
                <FormKitSchema v-if="col.schema" :schema="col.schema" />
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="(c, i) in props.cols" :key="c.field" :props="props" class="text-left! col-wraper"
                :class="[c?.class]">
                <slot :name="c.name" :data="data[c.name]">
                  <collection-cell v-if="!c.action" :data="props.row" :column="c" :index="i" />
                </slot>
              </q-td>

            </q-tr>
          </template>
        </q-table>
      </FormKit>
    </div>
    <ListSkeleton v-else :columns="7" />
  </div>
</template>

<script setup lang="ts">
import { useCloned } from '@vueuse/core'


interface Props {
  store: any
  field?: string
}
const { field = '_id', store } = defineProps<Props>()

const { entity } = storeToRefs(store)
const rows = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({})
store.iniCollection().then(() => {

  store.getCollection().then(() => {

    pagination.value = {
      sortBy: 'desc',
      descending: false,
      page: store.collection.,
      rowsPerPage: 3,
      rowsNumber: 10
    }
  })

})
const data = ref({})

const selected = ref([])

function removeMultiple() {
  store.removeMultiple(useCloned(selected.value).cloned)
  selected.value = []
}


</script>

<style scoped>
::highlight(highlight-0),
::highlight(highlight-1),
::highlight(highlight-2),
::highlight(highlight-3),
::highlight(highlight-4),
::highlight(highlight-5),
::highlight(highlight-6),
::highlight(highlight-7) {
  background-color: #fde047;
  color: black;
}
</style>
