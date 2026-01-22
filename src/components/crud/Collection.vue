<template>
  <div v-if="collection.columns.length && !firstLoading" class="relative ">

    <FormKit v-model="collection.filters" type="form" :actions="false" form-class="block m-auto"
      :config="{ wrapperClass: 'mb-0!' }">
      <q-table flat :bordered="$q.screen.xs" :grid="$q.screen.xs" :dense="$q.screen.lt.md" class="sticky-header-table"
        :title="entity.name" :rows="collection.items" :columns="collection.computedColumns" row-key="id"
        v-model:pagination="collection.computedPagination" :loading="!!cloading"
        :visible-columns="collection.visibleColumns" :table-style="`max-height: ${mxh}px;`" binary-state-sort
        @request="onRequest" :class="{
          'loading': !!cloading
        }">
        <template v-slot:top="props">
          <CollectionTop :entity="entity" :inFullscreen="props.inFullscreen" @reload="store.getCollection"
            @toggle-fullscreen="props.toggleFullscreen" />
        </template>
        <template v-slot:header="props">
          <CollectionHeader :columns="collection.computedColumns" :entity="entity" :data="props" />
        </template>
        <template v-slot:body="props">
          <CollectionBody :data="props" @remove="store.remove" />
        </template>
      </q-table>
    </FormKit>
  </div>
  <ListSkeleton v-else :columns="7" />
</template>

<script setup lang="ts">
import { PaginationQuasar } from '@/types/collection';
import { EntityInterface } from '@/types/entity';
import { Store } from '@/types/store';
import { useCloned } from '@vueuse/core'
import { useQuasar } from 'quasar'

interface Props {
  store: Store
  field?: string
}
const { field = '_id', store } = defineProps<Props>()
const { entity } = storeToRefs(store) as Record<'entity', Ref<EntityInterface>>

let collection = entity.value.collection
const $q = useQuasar()
const mxh = computed(() => $q.screen.height - 270)

const firstLoading = ref(true)


store.iniCollection().then(() => {

  store.getCollection().then(() => {

    collection = entity.value.collection




    nextTick(() => {
      firstLoading.value = false
      if (Object.values(entity.value.collection.filters).length) {
        nextTick(() => highlighted(entity.value.collection));
      }
    })

  })

})

const data = ref({})

const selected = ref([])

function removeMultiple() {
  store.removeMultiple(useCloned(selected.value).cloned)
  selected.value = []
}

function onRequest(arg: Record<'pagination', PaginationQuasar>) {
  store.getCollection(arg).then(() => {
    collection = entity.value.collection

  })
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
  background-color: #fef08a;
  color: black;
}
</style>
