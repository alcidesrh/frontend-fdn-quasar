import { EntityStore } from "@/types/graphql";
import { useRoute } from "vue-router";

export function useActiveStore(): Record<any, EntityStore> {
  const route = useRoute();
  const entity = route.params.entity;
  const storeId = `${entity.toLowerCase()}Store`;

  const pinia = getActivePinia();

  if (!pinia || !pinia._s.has(storeId)) {
    throw new Error(
      `Store "${storeId}" not found. Ensure introspection completed successfully.`,
    );
  }
  const store = defineStore(storeId)();

  return { store };
}
