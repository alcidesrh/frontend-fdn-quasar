<template>
  <q-input
    outlined
    v-model="value"
    class="w-full"
    dense
    :loading="loading"
    bg-color="white"
  >
    <template v-slot:append>
      <q-icon
        v-if="!value"
        name="sym_o_event"
        class="cursor-pointer text-surface-5"
        size="20px"
      >
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="date"
            v-bind="util.omitKeysContaining(context.node.props)"
          >
            <div class="row items-center justify-end"></div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
      <icon v-else-if="!loading" name="close" size="20px" @click="reset" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const props = defineProps({
  context: Object,
});

const date = ref("");
const value = ref("");
const loading = ref(false);

watch(
  () => date.value,
  (v) => {
    if (!v) {
      value.value = "";
    } else {
      value.value = `${v.from} a ${v.to}`;
    }
    save();
  },
);

watch(
  () => cloading.value,
  (v) => {
    if (!v) {
      loading.value = false;
    }
  },
);

async function save() {
  if (!date.value) {
    await props.context.node.input(null);
  } else if (props.context?.range) {
    await props.context.node.input([
      { after: cformat(date.value.from), before: cformat(date.value.to) },
    ]);
  } else {
    await props.context.node.input(date.value);
  }
  bus.emit(props.context.eventbus);
  loading.value = true;
}

async function reset() {
  loading.value = false;
  date.value = null;
  value.value = null;
  await props.context.node.input(null);
  bus.emit(props.context.eventbus);
}
</script>
