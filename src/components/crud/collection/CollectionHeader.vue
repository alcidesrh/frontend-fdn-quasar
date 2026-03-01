<template>
  <q-tr :props="data" class="h-35px!">
    <q-th
      v-for="(col, i) in data.cols"
      :key="col.name"
      :props="data"
      :class="['sortable' ? col.sortable : '']"
    >
      <div class="flex w-full flex-nowrap" @click.stop>
        <div class="u-text-0 ml-10px w-fit" :class="[col?.class]">
          {{ col?.label || col.name }}
        </div>
        <div class="w-fit ml-10px" @click.stop="">
          <icon
            fill
            v-if="i > 0"
            name="arrow_back_ios_new"
            class="text-14px font-700 text-surface-4 hover:(text-surface-6 font-300) rosdtate-90"
            @click.stop="$emit('orderColumns', i, 'left')"
          />
          <icon
            fill
            v-if="i + 1 < data.cols.length"
            class="text-14px ml-5px font-700 text-surface-4 hover:(text-surface-6 font-300) rosdtsate-45"
            name="arrow_forward_ios"
            @click.stop="$emit('orderColumns', i, 'rigth')"
          />
        </div>
      </div>
    </q-th>
    <q-th>
      <q-btn
        size="sm"
        v-if="selected && selected.length"
        @click="$emit('removeMultiple')"
        class="bg-red-1 absolute -mt-17px z-36 left-50% -ml-28px"
      >
        <icon name="delete" class="text-negative text-24px font-300" />
      </q-btn>
    </q-th>
  </q-tr>
  <q-tr v-if="data.cols.filter((v) => v?.schema).length">
    <q-th v-for="col in data.cols" :key="col.name">
      <div :class="[col?.class]">
        <FormKitSchema
          v-if="col.schema"
          :schema="col.schema"
          :data="store.filters"
        />
      </div>
    </q-th>

    <q-th>
      <q-checkbox
        v-if="selectionMode"
        v-model="data.selected"
        color="secondary"
      />
    </q-th>
  </q-tr>
</template>

<script setup lang="ts">
const { store } = useActiveStore();

interface Props {
  data: any;
  selectionMode: Boolean;
  selected: Array;
}
const { columns, entity, data, selectionMode } = defineProps<Props>();
const emit = defineEmits(["removeMultiple", "orderColumns"]);
</script>
