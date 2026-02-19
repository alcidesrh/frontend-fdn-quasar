import type { Action } from "@/types/action";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
  "menuStore",
  () => createStore<Action>("Action"),
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
