<template>
  <q-tree :nodes="menu" node-key="label" default-expand-all>


    <template v-slot:default-header="prop">
      <div class="row items-center">
        <icon :name="prop.node.icon || 'sym_o_star'" class="mr-10px slate-6" />
        <div class=" text-primary">{{ prop.node.label }}</div>
      </div>
    </template>


  </q-tree>
</template>

<script setup lang="ts">
const props = defineProps({
  menu: {
    type: Array<any>,
    default: null,
  },
  store: {
    type: Object,
    default: {},
  },
})

</script>
<style scoped></style>
`
