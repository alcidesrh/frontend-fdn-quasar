<template>

  <q-tr :props="data" class="h-30px!">
    <q-th v-for="col in columns" :key="col.name" :props="data" class="u-text-0 text-left! text-slate-6"
      :class="['sortable' ? col.sortable : '']">
      <div :class="[col?.class]">{{ col.label }}</div>
    </q-th>
    <q-th>
      hola
    </q-th>
  </q-tr>
  <q-tr>
    <q-th v-for="col in columns" :key="col.name">
      <div :class="[col?.class]">
        <FormKitSchema v-if="col.schema" :schema="col.schema" :data="entity.collection.filters" />
      </div>
    </q-th>
    <q-th>
    </q-th>
  </q-tr>
</template>

<script setup lang="ts">
import { EntityInterface } from '@/types/entity';

interface Props {
  columns: any
  entity: EntityInterface,
  data: any
}
const { columns, entity } = defineProps<Props>()

</script>
