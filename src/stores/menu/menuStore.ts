import type { Menu } from "@/types/menu";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
  "menuStore",
  () => {
    const store = createStore<Menu>("Menu");

    store.entity.value.endpoints.collection = "collectionMenus";
    return {
      ...store,
      // items: [
      //   { label: "Root", id: "root" },
      //   { label: "Submenu", id: "submenu_root" },
      //   { label: "Leaft", id: "leaft" },
      // ],
    };
  },
  {
    persist: {
      ...persist,
      afterHydrate: (ctx) => {
        if (ctx.store.items.length == 0) {
          ctx.store.getItems();
        }
      },
    },
  },
);
