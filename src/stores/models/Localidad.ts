import { EntityModel, EntityStore, Field } from "@/types/graphql";
import Base from "./Api";

export default class Localidad extends Base {
  formExclude = [];
  label = [];
  classes = {};
  formGroups = [];
  constructor(name) {
    super(name);
    this.formExclude = [...this.baseFormExclude, ...this.formExclude];
    this.label = [...this.baseLabel, this.label];
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
