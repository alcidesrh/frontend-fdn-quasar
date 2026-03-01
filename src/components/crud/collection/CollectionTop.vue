<template>
  <div class="grid justify-items-center ml-auto">
    <div class="flex table-options">
      <div
        @click="$router.push({ name: 'form', params: { entity: entity.name } })"
      >
        <icon name="add" />
      </div>
      <div>
        <icon
          name="add_column_right"
          class="px-6px py-2px"
          :class="{ active: open }"
        >
          <q-badge
            v-if="!visibleAllColumns"
            color="primary"
            floating
            class="font-medium"
            rounded
            >{{ store.columns.length - store.computedColumns.length }}</q-badge
          >
          <q-menu
            v-model="open"
            transition-show="flip-left"
            transition-hide="flip-right"
          >
            <q-card
              class="my-card"
              style="width: 100%; max-width: 500px; min-width: 230px"
            >
              <q-card-section>
                <div
                  class="row items-center gap-5"
                  :class="{ 'opacity-50': visibleAllColumns }"
                >
                  <div class="col font-semibold">Mostrar todas</div>
                  <div class="col-auto">
                    <q-toggle
                      size="xs"
                      v-model="visibleAllColumns"
                      :disable="visibleAllColumns"
                    />
                  </div>
                </div>
                <q-separator inset my-2 />
                <template v-for="(col, i) in store.columns" :key="i">
                  <div class="u-px-sm">
                    <div class="row items-center gap-5 mb-3">
                      <div class="col u-text-0 font-medium">
                        {{ col.label }}
                      </div>
                      <div class="col-auto">
                        <q-toggle
                          size="xs"
                          v-model="store.visibleColumns"
                          :val="col.field"
                          :disable="
                            store.visibleColumns.length == 1 &&
                            store.visibleColumns[0] == col.field
                          "
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </q-card-section>
            </q-card>
          </q-menu>
        </icon>
      </div>
      <div>
        <icon
          :class="{ active: !toggleAction }"
          @click="setToggleAction"
          name="checklist_rtl"
        />
      </div>
      <div>
        <icon
          :class="{ active: inFullscreen }"
          :name="inFullscreen ? 'recenter' : 'fullscreen'"
          @click="$emit('toggleFullscreen')"
        />
      </div>

      <div>
        <icon
          @click="reset"
          name="autorenew"
          :class="{ active: open || !toggleAction || inFullscreen }"
        />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
const { store } = useActiveStore();

// import { EntityInterface } from "@/types/entity";

interface Props {
  // entity: EntityInterface;
  inFullscreen: Boolean;
}
const open = ref(false);
const { inFullscreen } = defineProps<Props>();
const emit = defineEmits<{
  (e: "reload"): void;
  (e: "toggleFullscreen"): void;
  (e: "toggleSelectionMode"): void;
  (e: "reset"): void;
}>();

// const collection = store.items,
const toggleAction = ref(true);

const visibleAllColumns = ref(
  store.visibleColumns.length == store.columns.length,
);

function setToggleAction() {
  // if (!toggleAction.value) {
  emit("toggleSelectionMode");
  // }
  toggleAction.value = !toggleAction.value;
}

watch(
  () => store.visibleColumns,
  (v) => {
    visibleAllColumns.value =
      store.visibleColumns.length == store.columns.length;

    const computedColumns = store.computedColumns.map((v) => v.field);
    const temp = computedColumns.filter((r) => v.includes(r));
    const temp2 = v.filter((v) => !temp.includes(v));

    store.computedColumns = store.columns.filter((v) =>
      [...temp, ...temp2].includes(v.field),
    );

    emit("reload");
    // store.getCollection()
  },
);
watch(
  () => visibleAllColumns.value,
  (v) => {
    if (v) {
      store.visibleColumns = store.columns.map((v) => v.field);
    }
  },
);

function reset() {
  if (inFullscreen) {
    emit("toggleFullscreen");
  }
  if (!toggleAction.value) {
    setToggleAction();
  }
  emit("reset");
}
</script>
<style lang="scss">
.table-options {
  box-shadow: $shadow-1;
  display: flex;
  align-items: center;
  & > div {
    cursor: pointer;
    // width: 40px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid $surface-4;
    background-color: $surface-2;

    padding: 3px 10px;
    &:hover {
      background-color: $hover;
    }
    & > .fdn-icon {
      font-size: 1.2rem;
      color: $surface-9;
      &.active {
        font-weight: 600;
      }
    }
  }
}
</style>
