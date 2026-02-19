import type { Icon } from "@/types/icon";
import { defineStore } from "pinia";

export const useIconStore = defineStore("iconStore", {
  state: () => createStore<Icon>("Icon"),
  persist: {
    ...persist,
    afterHydrate: (ctx) => {
      if (ctx.store.items.length == 0) {
        ctx.store.getItems();
      }
    },
  },
});
