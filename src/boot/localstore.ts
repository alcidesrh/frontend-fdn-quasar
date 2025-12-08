import { defineBoot } from "#q-app/wrappers";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ store }) => {
  store.use(piniaPluginPersistedstate);
  useMetadataStore();
  if (!fdn.value.isReady) {
    await fdn.value.load();
  }
});
