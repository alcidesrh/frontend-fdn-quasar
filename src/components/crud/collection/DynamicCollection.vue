<template>
  <div v-if="store.columns.length" class="relative">
    <!-- <div class="absolute left-50% top-20px z-2000 bg-slate-2">
      <pre>  {{ t2 }}</pre>
    </div> -->
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
        :dense="$q.screen.sm"
        class="sticky-header-table"
        :rows="items"
        :columns="store.computedColumns"
        :visible-columns="store.visibleColumns"
        row-key="id"
        v-model:pagination="paginationQuasar"
        :loading="!!cloading"
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
            :selection-mode="selectionMode"
            :selected="selected"
            :data="props"
            :clear="clear"
            @remove-multiple="store.removeMultiple(selected)"
            @order-columns="store.orderColumns"
          />
        </template>
        <template v-slot:body="props">
          <CollectionBody :data="props" :selection-mode="selectionMode">
            <template #actions_row>
              <div flex justify-center items-center gap-1>
                <icon
                  @click="
                    $router.push({
                      name: 'form',
                      params: {
                        entity: store?.nameDecapitalize,
                        id: props.row[field || '_id'],
                      },
                    })
                  "
                  round
                  name="stylus"
                  class="border-surface-4 rounded-full text-emerald-8 text-20px lg:text-22px"
                  wght="200"
                />
                <icon
                  @click="store.remove(props.row)"
                  name="delete"
                  wght="200"
                  class="border-surface-4 rounded-full text-orange-8 text-22px"
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

const store = await getStore();

const { items } = storeToRefs(store);

const $q = useQuasar();
const mxh = computed(() => $q.screen.height - 270);

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
let firstLoad = true;
// (async () => {
//   await store.collection();
// })();

watch(
  () => store.filters,
  (v, y) => {
    if (!firstLoad) {
      store.collection();
    } else {
      firstLoad = false;
    }
  },
);

const data = ref({});

const selected = ref([]),
  selectionMode = ref(false);

const clear = ref(false);
function reset() {
  selected.value = [];
  clear.value = !clear.value;
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
