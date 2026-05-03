// src/boot/pinia.js
import { entityPlugin } from "@/stores/baseStoreFactory";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { boot } from "quasar/wrappers";

export default boot(({ app, store }) => {
  store.use(entityPlugin);
  store.use(piniaPluginPersistedstate);
});
