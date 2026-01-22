<template>

  <q-input :for="context.id" v-model="typing" :placeholder="context.placeholder" :loading="loading" outlined dense flat
    bg-color="white" class="w-full" :type="context.inputType">
    <template v-slot:append>
      <icon v-if="typing && !loading" name="close" size="20" @click="reset" />
    </template>
  </q-input>

</template>
<script setup>
import { useTimeoutFn } from '@vueuse/core'

const props = defineProps({
  context: Object,
})
const typing = ref(props.context._value || '')
const loading = ref(false)
const {
  start: startError,
  isPending: isPendingError,
  stop: stopError,
} = useTimeoutFn(
  () => {
    loading.value = false
  },
  5000,
  { immediate: false },
)
const { start, isPending, stop } = useTimeoutFn(
  async () => {
    loading.value = true

    let value = typing.value

    await props.context.node.input(value)
    startError()
    bus.emit(props.context.eventbus)
  },
  1000,
  { immediate: false },
)

watch(() => typing.value, () => {

  if (!loading.value) {
    if (!isPending.value) {
      stop()
      stopError()
    }
    start()
  }

})

watch(
  () => cloading.value,
  (v) => {

    if (!v) {
      if (isPending) {
        stop()
      }
      if (isPendingError) {
        stopError()
      }
      loading.value = false
    }
  },
)

watch(() => props.context.loading, () => {
  if (isPending) {
    stop()
  }
  if (isPendingError) {
    stopError()
  }
  loading.value = false
},
)

async function reset() {
  loading.value = false
  typing.value = null
  await props.context.node.input(null)
  bus.emit(props.context.eventbus)
}

</script>
