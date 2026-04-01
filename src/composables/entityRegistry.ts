// entity-engine/entityRegistry.ts
import { ref } from "vue";
import storeFactory from "../stores/storeFactory";

// export const entities = ref({});
export const stores = new Map();

export function registerEntity(entity) {
  entities.value[entity.name] = entity;
}

export function getEntity(name) {
  return entities.value[name];
}

export async function getStore(entity?) {
  if (!entity && !(entity = useRoute().params.entity)) {
    throw Error(`No nombre de entidad`);
  }
  let store;
  const storeId = `${str.capitalize(entity)}Entity`;
  if (!(store = stores.get(storeId))) {
    const pinia = await getActivePinia();
    if (!pinia || !(storeId in pinia.state.value)) {
      if (!(store = await storeFactory(storeId))) {
        throw Error(
          `entityRegistry linea 25: No se pudo crear la store de nombre ${entity}`,
        );
      } else {
        stores.set(storeId, store);
      }
    } else {
      return defineStore(storeId)();
    }
  }
  return store;
}
