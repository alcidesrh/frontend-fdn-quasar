<template>
  <div v-if="!firstLoading" class="relative">
    <div class="absolute left-50% top-20px z-2000"></div>
    <FormKit
      v-model="collection.filters"
      type="form"
      :actions="false"
      form-class="block m-auto"
      :config="{ wrapperClass: 'mb-0!' }"
    >
      <q-table
        flat
        :bordered="$q.screen.xs"
        :grid="$q.screen.xs"
        :dense="$q.screen.lt.md"
        class="sticky-header-table"
        :title="entity.name"
        :rows="collection.items"
        :columns="collection.computedColumns"
        row-key="id"
        v-model:pagination="collection.paginationQuasar"
        :loading="!!cloading"
        :visible-columns="collection.visibleColumns"
        :table-style="`max-height: ${mxh}px;`"
        binary-state-sort
        @request="onRequest"
        :class="{
          loading: !!cloading,
        }"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top="props">
          <CollectionTop
            :entity="entity"
            :inFullscreen="props.inFullscreen"
            @reload="store.getCollection"
            @toggle-fullscreen="props.toggleFullscreen"
            @toggle-selection-mode="toggleSelectionMode"
            @reset="reset"
          />
        </template>
        <template v-slot:header="props">
          <CollectionHeader
            :columns="collection.computedColumns"
            :entity="entity"
            :data="props"
            :selection-mode="selectionMode"
            :selected="selected"
            @remove-multiple="store.removeMultiple(selected)"
            @order-columns="store.orderColumns"
          />
        </template>
        <template v-slot:body="props">
          <CollectionBody :data="props" :selection-mode="selectionMode">
            <template #actions_row>
              <div flex justify-center items-center>
                <icon
                  @click="
                    $router.push({
                      name: 'form',
                      params: {
                        entity: entity.name,
                        id: props.row[field || '_id'],
                      },
                    })
                  "
                  round
                  name="stylus"
                  class="border-surface-4 rounded-full absolute! mr-35px text-emerald-8 text-24px"
                  wght="200"
                />
                <icon
                  @click="store.remove(props.row)"
                  name="delete"
                  wght="200"
                  class="border-surface-4 rounded-full absolute! -mr-35px text-orange-8 text-24px"
                />
              </div>
            </template>
          </CollectionBody>
        </template>
      </q-table>
    </FormKit>
  </div>
  <ListPreload v-else :cols="7" />
</template>

<script setup lang="ts">
import { PaginationQuasar } from "@/types/collection";
import { EntityInterface } from "@/types/entity";
import { Store } from "@/types/store";
import { useCloned } from "@vueuse/core";
import { useQuasar } from "quasar";

interface Props {
  store: Store;
  field?: string;
}
const store = useCurrentEntityStore();
// const { field = "_id", store } = defineProps<Props>();
const { entity } = storeToRefs(store.value) as Record<
  "entity",
  Ref<EntityInterface>
>;

let collection = entity.value.collection;
const $q = useQuasar();
const mxh = computed(() => $q.screen.height - 270);

const firstLoading = ref(true);

store.value.iniCollection().then(() => {
  store.value.getCollection().then(() => {
    collection = entity.value.collection;

    nextTick(() => {
      firstLoading.value = false;
      if (Object.values(entity.value.collection.filters).length) {
        nextTick(() => highlighted(entity.value.collection));
      }
    });
  });
});

const data = ref({});

const selected = ref([]),
  selectionMode = ref(false);

function reset() {
  selected.value = [];
  collection.filters = [];
}

function removeMultiple() {
  store.value.removeMultiple(useCloned(selected.value).cloned);
  selected.value = [];
}

function onRequest(arg: Record<"pagination", PaginationQuasar>) {
  store.value.getCollection(arg).then(() => {
    collection = entity.value.collection;
  });
}
function toggleSelectionMode() {
  if (selectionMode.value) {
    selected.value = [];
  }
  selectionMode.value = !selectionMode.value;
}
</script>

<style scoped lang="scss">
::highlight(highlight-0),
::highlight(highlight-1),
::highlight(highlight-2),
::highlight(highlight-3),
::highlight(highlight-4),
::highlight(highlight-5),
::highlight(highlight-6),
::highlight(highlight-7) {
  background-color: $highlight;
  color: black;
}
</style>
