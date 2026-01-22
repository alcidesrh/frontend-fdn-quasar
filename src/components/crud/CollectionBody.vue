<template>
  <q-tr :props="data">
    <q-td v-for="(c, i) in data.cols" :key="c.field" :props="data" class="text-left! col-wraper">
      <div :class="[c?.class]">
        <slot :name="c.name" :data="data[c.name]">
          <collection-cell v-if="!c.action" :data="data.row" :column="c" :index="i" />
        </slot>
      </div>
    </q-td>
    <q-td>
      <div flex justify-center items-center>
        <icon round name="stylus"
          class="hover:bg-white hover:border border-slate-4 border-sldfate-3 rounded-full absolute  mr-30px  transition  duration-300 text-secondary text-24px"
          wght="200"  />
        <icon @click="$emit('remove', data.row)" name="delete"  wght="200"
          class="hover:bg-white hover:border border-slate-4 border-sldfate-3 rounded-full absolute -mr-30px  transition  duration-300 text-warning text-24px" />
      </div>
    </q-td>
  </q-tr>
</template>
<script setup lang="ts">
  import { EntityInterface } from '@/types/entity';
  
  interface Props {
    data: any,
  }
  const { entity } = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'remove'): void;
  
  }>();
  
  // const collection = entity.collection
  
  // const visibleAllColumns = ref(collection.visibleColumns.length == collection.columns.length)
  // // const columns = computed(() => entity.value.collection.columns.filter(v => entity.value.collection.visibleColumns.includes(v.field)))
  
  // watch(() => collection.visibleColumns, (v) => {
  //   visibleAllColumns.value = collection.visibleColumns.length == collection.columns.length
  //   emit('reload')
  //   // store.getCollection()
  // })
  // watch(() => visibleAllColumns.value, (v) => {
  //   if (v) {
  //     collection.visibleColumns = collection.columns.map(v => v.field)
  //   }
  // })
  </script>
