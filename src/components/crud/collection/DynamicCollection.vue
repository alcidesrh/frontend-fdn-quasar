<template>
  <div v-if="store.columns.length" class="relative">
    <!-- <div class="absolute left-50% top-20px z-2000"></div> -->
    <FormKit
      v-model="store.filters"
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
        :rows="store.items"
        :columns="store.computedColumns"
        row-key="id"
        v-model:pagination="paginationQuasar"
        :loading="!!cloading"
        :visible-columns="store.visibleColumns"
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
            :inFullscreen="props.inFullscreen"
            @reload="store.collection"
            @toggle-fullscreen="props.toggleFullscreen"
            @toggle-selection-mode="toggleSelectionMode"
            @reset="reset"
          />
        </template>
        <template v-slot:header="props">
          <CollectionHeader
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
import { EntityStore } from "@/types/graphql";
import { Store } from "@/types/store";
import { useCloned } from "@vueuse/core";
import { useQuasar } from "quasar";
// import { defineStore, getActivePinia, storeToRefs } from "pinia";

// const route = useRoute();
// const entity = route.params.entity;
// const storeId = `${entity.toLowerCase()}Store`;

// const pinia = getActivePinia();

// if (!pinia || !pinia._s.has(storeId)) {
//   throw new Error(
//     `Store "${storeId}" not found. Ensure introspection completed successfully.`,
//   );
// }
// const store = defineStore(storeId)();
const { store } = useActiveStore();
// const { pagination } = storeToRefs(store);

// store.collection();
// cl(store.$state);
// store.collection();
// const store = useEntityStore();
// interface Props {
//   store: Store;
//   field?: string;
// }
// const store = useCurrentEntityStore();
// const { field = "_id", store } = defineProps<Props>();
// const { entity } = storeToRefs(store.value) as Record<
//   "entity",
//   Ref<EntityInterface>
// >;

// let collection = entity.value.collection;
const $q = useQuasar();
const mxh = computed(() => $q.screen.height - 270);

const firstLoading = ref(false);

const paginationQuasar = ref({
  sortBy: store.orderField,
  descending: store.orderType == "DESC",
  page: store.pagination.currentPage,
  rowsPerPage: store.pagination.itemsPerPage,
  rowsNumber: store.pagination.totalCount,
});
watchEffect(() => {
  paginationQuasar.value.page = store.pagination.currentPage;
  paginationQuasar.value.rowsPerPage = store.pagination.itemsPerPage;
  paginationQuasar.value.rowsNumber = store.pagination.totalCount;
  paginationQuasar.value.descending = store?.orderType == "DESC";
  paginationQuasar.value.sortBy = store?.orderField;
});
watch(
  () => store?.filters,
  () => store.collection(),
  { immediate: true },
);

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

function onRequest({
  pagination,
  filter,
}: Record<"pagination", PaginationQuasar>) {
  store.pagination.currentPage = pagination.page;
  store.pagination.itemsPerPage = pagination.rowsPerPage;
  store.pagination.totalCount = pagination.rowsNumber;
  store.orderField = pagination.sortBy;
  store.orderType = pagination.descending ? "DESC" : "ASC";

  store.collection();
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
