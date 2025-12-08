<template>

</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'


const $q = useQuasar()

function show(arg) {
  const temp = {
    type: arg.color,
    multiLine: true,
    textColor: arg.color,
  }

  if (typeof arg.msg == "object") {
    $q.notify({ ...temp, ...arg.msg })
    return
  }
  $q.notify({ ...temp, message: arg.msg })

}

bus.on('error', (msg) => {
  show({ color: 'negative', msg: msg })
})
bus.on('positive', (msg) => {
  show({ color: 'positive', msg: msg })
})
bus.on('info', (msg) => {
  show({ color: 'positive', msg: msg })
})

</script>
<style lang="scss">
.fdn-notify {
  border: 1px solid;
  border-left: 10px solid;
  backdrop-filter: blur(3px) saturate(120%);
  font-size: 1rem;
  background-color: rgba(white, 0.7) !important;

  &.bg-negative {

    border-color: $red-5;
  }

  &.bg-positive {
    border-color: $teal-6;
    color: $teal-9 !important
  }

  &.bg-info {
    border-color: $blue-6;
    color: $blue-9 !important
  }
}
</style>
