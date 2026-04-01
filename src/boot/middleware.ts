// import { entityManager } from "src/stores/core/entityManager";
import { defineBoot } from "#q-app/wrappers";

export default defineBoot(async ({ router }) => {
  router.afterEach(async (to) => {
    const entity = to.params.entity as string;
    if (!entity) {
      return true;
    }

    if (to.meta.lista) {
      const store = await getStore(entity);
      store.collection();
    } else if (to.meta.form) {
      const store = await getStore();
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
