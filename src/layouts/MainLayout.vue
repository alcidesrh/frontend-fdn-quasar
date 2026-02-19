<template>
  <q-layout view="hHh LpR fFf">
    <!-- <LoadingBar /> -->
    <Notify />
    <Topbar />

    <SidebarDrawer store-id="sidebarLeft" position="left" v-once>
      <template #content="{ data }">
        <nav>
          <MenuLarge
            v-if="data.mode == data.modeStates.large"
            :store="data"
            :menu="customize"
          />

          <MenuMini
            v-else-if="data.mode == data.modeStates.mini"
            :items="customize"
          >
          </MenuMini>
        </nav>
      </template>
    </SidebarDrawer>
    <q-page-container class="h-[100vh]" :class="[sidebarStore.position, mode]">
      <div class="h-full u-p-xs">
        <RouterView v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'route'" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </RouterView>
        <q-inner-loading :showing="loadingStore.loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const sidebarStore = useSidebarStore("sidebarLeft", "left");
const loadingStore = useLoadingStore();

const { mode, modeStates } = storeToRefs(sidebarStore);

const menu = [
  {
    label: "Limpiar cache",
    icon: "cached",
    name: "refresh",
    type: "action",
    command: () => {
      fdn.value.refresh();
    },
  },
  {
    label: "Mi cuenta",
    icon: "account_circle",
    open: true,
    children: [
      {
        label: "Editar",
        icon: "person_edit",
        name: "account_edit",
        params: { id: "user.value.username" },
      },
      {
        label: "Chequear",
        icon: "transit_ticket",
        to: "",
      },
      {
        label: "Buscar",
        icon: "search",
        to: "",
      },
      {
        label: "Estadísticas",
        icon: "graph_7",
        to: "",
      },
    ],
  },
];
const menuStore = useMenuStateStore("menu-left", menu);
const { toggle } = storeToRefs(menuStore);

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const customize = ref([
  {
    label: "Menu",
    icon: "menu",
    name: "collectionMenus",
  },
  {
    label: "Mi cuenta",
    icon: "account_circle",
    open: true,
    children: [
      {
        label: "Editar",
        icon: "person_edit",
        name: "account_edit",
        params: "{ id: user.value.username }",
      },
      {
        label: "Chequear",
        icon: "transit_ticket",
        to: "",
        children: [
          {
            label: "Editar dsaf dsf dsf dsf ds",
            icon: "person_edit",
            name: "account_edit",
            params: "{ id: user.value.username }",
          },
          {
            label: "Chequear",
            icon: "transit_ticket",
            to: "",
          },
          {
            label: "Buscar",
            icon: "search",
            to: "",
            children: [
              {
                label: "Editar",
                icon: "person_edit",
                name: "account_edit",
                params: "{ id: user.value.username }",
              },
              {
                label: "Chequear",
                icon: "transit_ticket",
                to: "",
              },
              {
                label: "Buscar",
                icon: "search",
                to: "",
              },
            ],
          },
        ],
      },
      {
        label: "Buscar",
        icon: "search",
        to: "",
      },
      {
        label: "Estadísticas",
        icon: "graph_7",
        to: "",
      },
    ],
  },
]);

const eventSource = new EventSource(
  "http://localhost/.well-known/mercure?topic=error",
);

eventSource.onmessage = (event) => {
  // alert("yes");
};
</script>
<style lang="scss">
.q-page-container {
  flex-grow: 1;
  transition-property: padding-left;
  transition-duration: 0.3s;
  width: auto;
  padding-left: $sidebar-width;
  &.mini {
    padding-left: $sidebar-mini-width;
  }
  &.close {
    padding-left: 0;
  }
}
</style>
