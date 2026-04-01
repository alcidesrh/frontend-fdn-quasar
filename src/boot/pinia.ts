// src/boot/pinia.js
import { boot } from "quasar/wrappers";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { entityPlugin } from "@/stores/baseStoreFactory";

export default boot(({ app, store }) => {
  store.use(entityPlugin);
  store.use(piniaPluginPersistedstate);
});
