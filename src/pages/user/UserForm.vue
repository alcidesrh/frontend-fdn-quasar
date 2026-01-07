<template>
  <CrudForm :data="data" :store="store" :identifier="$route.params.id ? { username: $route.params.id } : null">
    <template #left-header="{ user }">
      <span class="font-medium u-text-1">
        <span v-if="user">{{ user.nombre }}: {{ user.username }}</span>
        <span v-else>Nuevo usuario</span>
      </span>
    </template>
    <template #CrudButton>
      <CrudButton :edit="!!entity.item?.id" @delete="store.remove()" @cancel="
        $router.push({
          name: entity.endpoints.collection
        })
        ">
        <template #CrudSubmitButton>
          <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" :loading="!!gloading" />
        </template>
      </CrudButton>

    </template>
    <template #localidad="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
    <template #roles="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>
<script setup lang="ts">

const store = useUserStore()
const { schema, entity } = storeToRefs(store)
alert(schema.value.length)

const localidadStore = useLocalidadStore()
const { items } = storeToRefs(localidadStore)
localidadStore.getItems()

const roleStore = useRoleStore()
const { items: roles } = storeToRefs(roleStore)
roleStore.getItems()

const permisoStore = usePermisoStore()
const { items: permisos } = storeToRefs(permisoStore)
permisoStore.getItems()

const data = ref({
  localidades: items,
  roles,
  permisos,
  // item: computed(() => entity.value.item),
  submit: (data) => store.submit(data),
})
</script>
