import { EntityModel, EntityStore, Field } from "@/types/graphql";
import Base from "./Api";

export default class Permiso extends Base {
  constructor(name) {
    super(name);
  }
  getFormData() {
    const store = useStoreByName("Role");
    store.getOptions();
    const { options } = storeToRefs(store);

    return {
      // localidades: items,
      roles: options,
      // permisos,
      // item: computed(() => entity.value.item),
      // submit: (data) => store.submit(data),
    };
  }
}
