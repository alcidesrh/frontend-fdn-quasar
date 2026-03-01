// src/boot/pinia.js
import { boot } from "quasar/wrappers";
// import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// const pinia = createPinia();
export default boot(({ app, store }) => {
  store.use(piniaPluginPersistedstate);
  // app.use(pinia);
  app.config.globalProperties.$pinia = store;
});

// export { pinia };
