<template>
  <q-tree :nodes="menu" node-key="label" default-expand-all>
    <template v-slot:header-root="prop">
      <div class="row items-center">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" class="q-mr-sm" style="width:50px;height:50px">
        <div>
          {{ prop.node.label }}
          <q-badge color="orange" class="q-ml-sm">New!</q-badge>
        </div>
      </div>
    </template>

    <template v-slot:header-generic="prop">
      <div class="row items-center">
        <q-icon :name="prop.node.icon ? `sym_o_${prop.node.icon}` : 'sym_o_star'" color="orange" size="28px"
          class="q-mr-sm" />
        <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
      </div>
    </template>

    <template v-slot:body-story="prop">
      <span class="text-weight-thin">The story is:</span> {{ prop.node.story }}
    </template>

    <template v-slot:body-toggle="prop">
      <p class="text-caption">{{ prop.node.caption }}</p>
      <q-toggle v-model="prop.node.enabled" label="I agree to the terms and conditions" />
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
