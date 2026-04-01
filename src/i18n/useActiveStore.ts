import storeFactory from "@/stores/storeFactory";
import { EntityStore } from "@/types/graphql";
import { useRoute } from "vue-router";

export async function useActiveStore(): Record<any, EntityStore> {
  const route = useRoute();
  return await createStore(route.params.entity);
}

export async function useStoreByName(name): Record<any, EntityStore> {
  return await createStore(str.capitalize(name));
}

async function createStore(name) {
  const storeId = `${str.decapitalize(name)}Store`;
  const pinia = await getActivePinia();
  if (!pinia || !(storeId in pinia.state.value)) {
    const store = await storeFactory(name);
    await store(pinia);
  }
  return defineStore(storeId)();
}
