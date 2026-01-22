<template>
  <div class="flex w-full items-center justify-end u-mt-2xs ">
    <!-- <div class=" q-table__title">{{ entity.name }}</div> -->
    <div class="row ">
      <q-icon name="sym_o_table_eye" class="cursor-pointer text-slate-700 " size="25px"
        :class="[!visibleAllColumns ? ' text-accent font-300' : 'font-extralight']">
        <q-badge v-if="!visibleAllColumns" color="info" floating class="font-medium" rounded>{{
          collection.columns.length - collection.computedColumns.length }}</q-badge>
        <q-menu transition-show="flip-left" transition-hide="flip-right">
          <q-card class="my-card" style="width: 100%; max-width: 500px; min-width: 230px;">
            <q-card-section>
              <div class="row items-center gap-5" :class="{ 'opacity-50': visibleAllColumns }">
                <div class="col font-semibold">
                  Mostrar todas
                </div>
                <div class="col-auto">
                  <q-toggle size="xs" v-model="visibleAllColumns" :disable="visibleAllColumns" />
                </div>
              </div>
              <q-separator inset my-2 />
              <template v-for="col, i in collection.columns" :key="i">
                <div class="u-px-sm">
                  <div class="row items-center gap-5 mb-3">
                    <div class="col u--text-1 font-medium">
                      {{ col.label }}
                    </div>
                    <div class="col-auto ">
                      <q-toggle size="xs" v-model="collection.visibleColumns" :val="col.field"
                        :disable="collection.visibleColumns.length == 1 && collection.visibleColumns[0] == col.field" />
                    </div>
                  </div>
                </div>

              </template>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-icon>

      <q-separator vertical />
      <icon :name="inFullscreen ? 'recenter' : 'fullscreen'" @click="$emit('toggleFullscreen')"
        class="cursor-pointer text-slate-700 " />
    </div>
  </div>
</template>
<script setup lang="ts">
import { EntityInterface } from '@/types/entity';

interface Props {
  entity: EntityInterface,
  inFullscreen: Boolean
}
const { entity } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'reload'): void;
  (e: 'toggleFullscreen'): void;

}>();

const collection = entity.collection

const visibleAllColumns = ref(collection.visibleColumns.length == collection.columns.length)
// const columns = computed(() => entity.value.collection.columns.filter(v => entity.value.collection.visibleColumns.includes(v.field)))

watch(() => collection.visibleColumns, (v) => {
  visibleAllColumns.value = collection.visibleColumns.length == collection.columns.length
  emit('reload')
  // store.getCollection()
})
watch(() => visibleAllColumns.value, (v) => {
  if (v) {
    collection.visibleColumns = collection.columns.map(v => v.field)
  }
})
</script>
