<template>
  <span v-if="!quasar" :class="[`fdn-icon slate-400 material-symbols-${type}`, ...clases]" :style="style">{{ name
  }}</span>
  <q-icon v-else :name="name" tag="span" :left="left" :size="size" :color="color" />
</template>
<script setup lang="ts">
const props = defineProps({
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
  size: {
    type: String,
    default: "24"
  },
  color: {
    type: String,
    required: false
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
    type: String,
    default: "400"  //100 to 700
  },
  clases: {
    type: Array,
    default: []
  }
});

let name = '', style = {}
if (props.quasar) {
  name = 'sym_o_' + props.name
}
else {

  const { fill, color, grad, size, opsz, wght, type } = props

  name = props.name

  style = computed(() => {
    const temp = fill ? 1 : 0
    const style = {
      fontSize: size + 'px',
      fontVariationSettings: `'FILL' ${temp}, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' ${opsz}`
    }
    if (color) {
      style.color = color
    }
    return style
  })

}
</script>
