<template>

  <q-btn v-if="btn" flat round :icon="`sym_o_${name}`">

  </q-btn>

  <span v-else-if="!quasar" :class="[`fdn-icon surface-45 material-symbols-${type}`]" :style="style">{{
    name
  }}
  </span>

  <q-icon v-else :name="name" tag="span" :left="left"></q-icon>
</template>
<script setup lang="ts">
const props = defineProps({
  flat: {
    type: Boolean,
    default: false
  },
  btn: {
    type: Boolean,
    default: false
  },
  quasar: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  fill: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'outlined' //rounded and sharp
  },

  opsz: {
    type: Number,
    default: 48  //20 to 48
  },
  grad: {
    type: Number,
    default: 0  //-25 to 200
  },
  wght: {
    type: String,  //100 to 700
    required: false
  },
  clases: {
    type: Array,
    default: []
  }
});
const name = ref(props.quasar ? 'sym_o_' + props.name : props.name)
let style = {}
if (!props.quasar) {

  const { fill, grad, opsz, wght, type, flat } = props
  name.value = props.name

  style = computed(() => {
    const temp = fill ? 1 : 0
    const style = {
      fontVariationSettings: `'FILL' ${temp}, 'GRAD' ${grad}, 'opsz' ${opsz}`
    }
    if (wght) {
      style.fontVariationSettings += `, 'wght' ${wght}`
    }
    return style
  })



}
</script>
