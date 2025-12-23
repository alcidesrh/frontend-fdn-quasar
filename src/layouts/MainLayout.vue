<template>
  <q-layout view="hHh LpR fFf">

    <Notify />
    <Topbar />

    <SidebarDrawer store-id="sidebarLeft" position="left" v-once>
      <template #content="{ data }">
        <q-separator class="mb-20px mt-10px" />
        <nav>
          <MenuLarge v-if="data.mode == data.modeStates.large" :store="data" :menu="customize" />

          <MenuMini v-else-if="data.mode == data.modeStates.mini" :items="customize">
          </MenuMini>
        </nav>
      </template>
    </SidebarDrawer>

    <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered> -->
    <!-- drawer content -->
    <!-- </q-drawer> -->

    <q-page-container>
      <div class="border border-slate-200">
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
    <div id="toogleLeftSidebar" class="shadow-7">
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
    icon: 'sym_o_menu',
    name: 'collectionMenus',

  },
  {
    label: 'Mi cuenta',
    icon: 'sym_o_account_circle',
    open: true,
    children: [
      {
        label: 'Editar',
        icon: 'sym_o_person_edit',
        name: 'account_edit',
        params: '{ id: user.value.username }',
      },
      {
        label: 'Chequear',
        icon: 'sym_o_transit_ticket',
        to: '',
        children: [
          {
            label: 'Editar',
            icon: 'sym_o_person_edit',
            name: 'account_edit',
            params: '{ id: user.value.username }',
          },
          {
            label: 'Chequear',
            icon: 'sym_o_transit_ticket',
            to: '',
          },
          {
            label: 'Buscar',
            icon: 'sym_o_search',
            to: '',
          }
        ]
      },
      {
        label: 'Buscar',
        icon: 'sym_o_search',
        to: '',
      },
      {
        label: 'Estadísticas',
        icon: 'sym_o_graph_7',
        to: '',
      },
    ],
  }
])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>
