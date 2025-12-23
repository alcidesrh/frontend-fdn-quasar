<template>
  <SidebarDrawer store-id="sidebarLeft" position="left">
    <template #content="{ data }">
      <nav class="">
        <AMenu :mode="data.mode" :menu="menuStore.menu" :root="true" :toggle="toggle" position="left"
          @toggle="toggle = !toggle" />
      </nav>
    </template>
  </SidebarDrawer>
</template>

<script setup lang="ts">
const menu = [
  {
    label: 'Limpiar cache',
    icon: 'cached',
    name: 'refresh',
    type: 'action',
    command: () => {
      fdn.value.refresh()
    }
  },
  {
    label: 'Mi cuenta',
    icon: 'account_circle',
    open: true,
    children: [
      {
        label: 'Editar',
        icon: 'person_edit',
        name: 'account_edit',
        params: { id: 'user.value.username' },
      },
      {
        label: 'Chequear',
        icon: 'transit_ticket',
        to: '',
      },
      {
        label: 'Buscar',
        icon: 'search',
        to: '',
      },
      {
        label: 'Estadísticas',
        icon: 'graph_7',
        to: '',
      },
    ],
  }
]
const menuStore = useMenuStateStore('menu-left', menu)
const { toggle } = storeToRefs(menuStore)
</script>
