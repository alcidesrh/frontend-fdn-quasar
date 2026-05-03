// import { entityManager } from "src/stores/core/entityManager";
import { defineBoot } from "#q-app/wrappers";

export default defineBoot(async ({ router }) => {
  router.beforeEach(async (to) => {
    const entity = to.params.entity as string;
    if (!entity) {
      return true;
    }
    const store = await getStore(entity);
    if (to.meta.lista) {
      store.collection();
    } else if (to.meta.form) {
      store.getFormSchema();
      const id = to.params.id as string | undefined;
      if (id) {
        store.getItem(id);
      } else {
        // store.newEntity();
      }
    }
    return true;
  });
});
