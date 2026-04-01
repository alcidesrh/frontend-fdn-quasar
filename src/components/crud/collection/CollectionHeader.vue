<template>
  <q-tr :props="data" class="h-35px!">
    <q-th
      v-for="(col, i) in data.cols"
      :key="col.name"
      :props="data"
      :class="['sortable' ? col.sortable : '']"
    >
      <div class="flex w-full flex-nowrap" @click.stop>
        <div class="u-text-0 ml-15px w-fit" :class="[col?.class]">
          {{ col?.label || col.name }}
        </div>
        <div class="w-fit ml-10px" @click.stop="">
          <icon
            fill
            v-if="i > 0"
            name="arrow_back_ios_new"
            class="text-12px lg:text-14px font-200 text-surface-6 hover:(text-surface-7 font-700) rosdtate-90"
            @click.stop="$emit('orderColumns', i, 'left')"
          />
          <icon
            fill
            v-if="i + 1 < data.cols.length"
            class="text-12px lg:text-14px ml-5px font-200 text-surface-6 hover:(text-surface-7 font-700) rosdtsate-45"
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
      <div v-if="col.schema" :class="[col?.class]">
        <FormKitSchema
          v-if="col.schema"
          :schema="col.schema"
          :data="{ clear }"
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
const store = getStore();

interface Props {
  data: any;
  selectionMode: Boolean;
  selected: Array;
  clear: Boolean;
}
const { clear, data, selectionMode } = defineProps<Props>();

const emit = defineEmits(["removeMultiple", "orderColumns"]);
</script>
