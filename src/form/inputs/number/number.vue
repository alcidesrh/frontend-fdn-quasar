<template>
  <q-input
    outlined
    dense
    bg-color="white"
    :id="context.id"
    v-model="typing"
    :value="context._value"
    :placeholder="context.placeholder"
    class="w-full"
    :loading="loading"
  >
    <template v-slot:append>
      <icon v-if="typing && !loading" name="close" size="20" @click="reset" />
    </template>
  </q-input>
</template>
<script setup>
import { useTimeoutFn } from "@vueuse/core";

const props = defineProps({
  context: Object,
});

const typing = ref("");
const loading = ref(false);
const {
  start: startError,
  isPending: isPendingError,
  stop: stopError,
} = useTimeoutFn(
  () => {
    loading.value = false;
  },
  5000,
  { immediate: false },
);
const { start, isPending, stop } = useTimeoutFn(
  async () => {
    let value = typing.value;
    //if (props.context.node.name == 'id') {
    //  value = value ? Number(value) : null
    //  }
    await props.context.node.input(value);
    startError();
    bus.emit(props.context.eventbus);
    loading.value = true;
  },
  1000,
  { immediate: false },
);

watch(
  () => typing.value,
  () => {
    if (!loading.value) {
      if (!isPending.value) {
        stop();
        stopError();
      }
      start();
    }
  },
);

watch(
  () => cloading.value,
  (v) => {
    if (!v) {
      if (isPending) {
        stop();
      }
      if (isPendingError) {
        stopError();
      }
      loading.value = false;
    }
  },
);

watch(
  () => props.context.loading,
  () => {
    if (isPending) {
      stop();
    }
    if (isPendingError) {
      stopError();
    }
    loading.value = false;
  },
);

async function reset() {
  loading.value = false;
  typing.value = null;
  await props.context.node.input(null);
  msgbus(props.context.eventbus).emit({ collection: "reload" });
}
</script>
