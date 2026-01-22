<template>
  <q-layout view="hHh LpR fFf">

    <Notify />
    <Topbar />

    <SidebarDrawer store-id="sidebarLeft" position="left" v-once>
      <template #content="{ data }">
        <nav>
          <MenuLarge v-if="data.mode == data.modeStates.large" :store="data" :menu="customize" />

          <MenuMini v-else-if="data.mode == data.modeStates.mini" :items="customize">
          </MenuMini>
        </nav>
      </template>
    </SidebarDrawer>
    <q-page-container class="h-[100vh]">
      <div class=" h-full u-p-xs lg:u-px-m">
        <router-view />
      </div>
    </q-page-container>





    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    <div id="toogleLeftSidebar">
    </div>
  </q-layout>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
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

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

const customize = ref([
  {
    label: 'Menu',
    icon: 'menu',
    name: 'collectionMenus',
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
        params: '{ id: user.value.username }',
      },
      {
        label: 'Chequear',
        icon: 'transit_ticket',
        to: '',
        children: [
          {
            label: 'Editar dsaf dsf dsf dsf ds',
            icon: 'person_edit',
            name: 'account_edit',
            params: '{ id: user.value.username }',
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
            children: [
              {
                label: 'Editar',
                icon: 'person_edit',
                name: 'account_edit',
                params: '{ id: user.value.username }',
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
              }
            ]
          }
        ]
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
])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>
