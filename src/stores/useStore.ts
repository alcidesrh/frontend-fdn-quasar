import type { Ref } from "vue";
import type { Collection } from "~/types/collection";
import type { SelectOption } from "~/types/fdn";

export function createStore<Type>(
  name: string,
  options: Record<string, any> = {},
) {
  const items: Ref<Array<SelectOption> | []> = ref([]);

  const entity = ref(new Entity<Type>(name));

  const schema = ref([]);

  let chanel = "";

  let unsubscribe: any;

  function crud(resource: string | null = null) {
    entity.value.item = {} as any;
    (async (params) => {
      // if (schema.value.length == 0) {
      await apollo.query(params).then(({ data, networkStatus }) => {
        if (typeof data == "undefined" && networkStatus == 1) {
          return;
        }
      });
    })({
      operation: entity.value.endpoints.crud,
      variables: { resource: entity.value.name },
      fields: ["schema"],
    });
  }
  function setFormkitSchema(id = null) {
    entity.value.item = {} as any;
    (async () => {
      const queries = [];
      let variables = {};

      if (id) {
        queries.push([
          {
            operation: entity.value.endpoints.get,
            fields: entity.value.getQueryFields(),
          },
        ]);
        variables = { ...id };
      }
      if (schema.value.length === 0) {
        queries.push({
          operation: entity.value.endpoints.form,
          fields: ["schema"],
        });
        variables.entity = entity.value.name;
      }
      apollo.query(queries, variables)?.then(({ data, networkStatus }) => {
        if (typeof data == "undefined" && networkStatus == 1) {
          return;
        }

        if (data[entity.value.endpoints.form]) {
          schema.value = useCloned(
            data[entity.value.endpoints.form].schema,
          ).cloned.value;
        }
        if (id) {
          entity.value.item = useCloned(
            data[entity.value.endpoints.get],
          ).cloned.value;
        }
        const { y: scrollY } = useWindowScroll();
        scrollY.value = 0;
      });
    })();
  }

  function resource(variables?) {
    if (!variables) {
      return false;
    }
    if (typeof variables != "object") {
      args = { id: args };
    }

    if (variables.id) {
      variables.id = entity.value.getIriFromId(variables.id);
    }

    const params = {
      operation: entity.value.endpoints.get(),
      variables,
      poptions: { fetchPolicy: "network-only" },
      fields: entity.value.getQueryFields(),
    };
    const { onResult, loading } = apollo.query(params).then(({ data }) => {
      if (typeof data == "undefined") {
        return;
      }
      let temp = data[entity.value.endpoints.get];
      const { y: scrollY } = useWindowScroll();
      scrollY.value = 0;
      temp = useCloned(temp).cloned.value;
      // Object.keys(temp).forEach((v) => {
      //     if (typeof temp[v] == 'object') {
      //         if (typeof temp[v]?.collection != 'undefined') {
      //             temp[v] = temp[v].collection.map((v) => v?.id || v);
      //         }
      //         // else if (typeof temp[v]?.id != 'undefined') {
      //         // temp[v] = temp[v].id;
      //         // }
      //     }
      // });
      entity.value.item = temp;
      // if (typeof entity.value.item.id == 'undefined') {
      // 	entity.value.item.id = getIriFromId(
      // 		entity.value.item._id,
      // 		entity.value.name,
      // 	);
      // }
    });

    // onResult(({ data }) => {
    //     if (typeof data == 'undefined') {
    //         return;
    //     }
    //     let temp = data[entity.value.endpoints.get];
    //     const { y: scrollY } = useWindowScroll();
    //     scrollY.value = 0;
    //     temp = useCloned(temp).cloned.value;
    //     Object.keys(temp).forEach((v) => {
    //         if (typeof temp[v] == 'object') {
    //             if (typeof temp[v]?.collection != 'undefined') {
    //                 temp[v] = temp[v].collection.map((v) => v?.id || v);
    //             }
    //             // else if (typeof temp[v]?.id != 'undefined') {
    //             // temp[v] = temp[v].id;
    //             // }
    //         }
    //     });
    //     entity.value.item = temp;
    //     if (typeof entity.value.item.id == 'undefined') {
    //         entity.value.item.id = getIriFromId(entity.value.item._id, entity.value.name);
    //     }
    // });
  }
  function unsubscribeChanel() {
    if (typeof unsubscribe != undefined && unsubscribe) {
      unsubscribe();
    }
  }
  function remove(arg?) {
    const temp = arg || entity.value.item;
    unsubscribeChanel();
    chanel = random();
    msgbus("remove").emit({
      chanel,
      header: "Eliminar",
      message: getAlertText("remove", temp?.nombre || "este elemento."),
    });
    unsubscribe = msgbus(chanel).on((v: any) => {
      unsubscribeChanel();
      const fields = {};
      fields[entity.value.camelCase] = ["id"];
      apollo
        .mutate(
          entity.value.endpoints.delete,
          { id: entity.value.getIriFromId(temp) },
          [fields],
        )
        .then(() => {
          msg.emit(getAlertText("remove_after"));
          getCollection("network-only");
          if (useRoute().meta.action == "edit") {
            useRouter().push({ name: entity.value.endpoints.list });
          }
        });
    });
  }
  function removeMultiple(items: Ref<[any]> | any) {
    unsubscribeChanel();
    chanel = random();
    let text = "";
    text = getAlertText("remove", `${items.value.length} elementos`);
    msgbus("remove").emit({ chanel, message: text });
    unsubscribe = msgbus(chanel).on((v: any) => {
      unsubscribeChanel();
      const fields = { agnostic: ["id"] };
      const temp = Array.isArray(items.value) ? items.value : [items];
      apollo
        .mutate({
          operation: "deleteAgnostic",
          variables: {
            resource: entity.value.name,
            ids: temp.map((i: any) => i._id),
          },
          fields: [fields],
        })
        .then(() => {
          msg.emit(getAlertText("remove_after"));
          getCollection("network-only");
        });
    });
  }
  function getItems(force = false) {
    if (!force && items.value.length != 0) {
      return;
    }
    const { onResult } = apollo
      .query({
        operation: "collectionAgnostic",
        fields: ["data"],
        variables: { resource: entity.value.name },
      })
      .then(({ data, networkStatus }) => {
        if (typeof data == "undefined" && networkStatus == 1) {
          return;
        }
        items.value = data.collectionAgnostic.data.collection;
      })
      .catch((error) => {});

    // onResult(({ data, networkStatus }) => {
    //     if (typeof data == 'undefined' && networkStatus == 1) {
    //         return;
    //     }
    //     items.value = data.collectionAgnostic.data.collection;
    // });
  }
  function iniCollection() {
    // getCollection();
    return new Promise((resolve, reject) => {
      if (entity.value.collection.columns.length) {
        resolve(true);
      }

      apollo
        .query({
          operation: "columnsMetadataResource",
          variables: { resource: entity.value.name },
          fields: ["data"],
        })
        .then(({ data, networkStatus }) => {
          if (typeof data == "undefined" && networkStatus == 1) {
            return;
          }
          entity.value.setColumns(
            data.columnsMetadataResource.data.collection.map((v) => v.name),
          );
          setColumns(data.columnsMetadataResource.data);
          resolve(true);
        });
    });
  }
  function setColumns(data) {
    const collection = entity.value.collection;
    collection.hasFilter = data.filter as boolean;
    collection.columns = (data.collection as any).map((i) => {
      const temp: any = useCloned(i).cloned.value;
      if (temp.schema) {
        const eventbus = name;
        temp.schema = { ...temp.schema, ...{ eventbus } };
      }
      return temp;
    });
  }
  function sortCollection(d: string) {
    const collection = entity.value.collection;

    const col = collection.columns.find((i) => i.name == d);
    if (typeof col != "undefined") {
      d = col.name;
    }
    if (collection.orderField == d) {
      if (collection.orderType == "ASC") {
        collection.orderType = "DESC";
      } else if (collection.orderType == "DESC") {
        collection.orderField = "";
        collection.orderType = "";
      }
    } else if (d) {
      collection.pagination.page = 1;
      collection.orderField = d;
      collection.orderType = "ASC";
    } else {
      collection.orderField = "";
      collection.orderType = "";
    }

    if (!collection.orderField) {
      collection.pagination.order = [{}];
    } else {
      // const
      const order = {} as any;
      order[collection.orderField] = collection.orderType;
      collection.pagination.order = [order];
    }
    getCollection();
  }
  function getCollection(fetchPolicy = "") {
    return apollo
      .collection(entity, fetchPolicy)
      .then(({ data, networkStatus }) => {
        if (typeof data == "undefined" && networkStatus == 1) {
          return;
        }
        const { y: scrollY } = useWindowScroll();
        scrollY.value = 0;

        const temp = data[entity.value.endpoints.collection];

        if (!Array.isArray(temp)) {
          const { collection, paginationInfo } =
            data[entity.value.endpoints.collection];
          entity.value.collection.pagination = {
            ...paginationInfo,
            page: entity.value.collection.pagination.page,
          };
          entity.value.collection.items = collection;
        } else {
          entity.value.collection.items = temp;
        }
      });
    // .catch((error) => {

    // });
  }
  function submit() {
    const { onDone, loading } = apollo.mutate({
      operation: entity.value.getMutationOperation(),
      variables: { input: Entity.prepareVariables(entity.value.item) },
      fields: entity.value.getMutationFields(),
    });
    onDone((data) => {
      entity.value.item = {} as any;
      msg.emit(getAlertText("update"));
      const router = useRouter();
      router.push({ name: entity.value.routes.list });
    });
  }
  watch(
    () => entity.value.collection.items,
    () => {
      nextTick(() => highlighted(entity.value.collection));
    },
  );
  // watch(
  // 	() => collection.value.vars,
  // 	(v, v2) => {
  // 		getCollection();
  // 	},
  // 	{ deep: true },
  // );

  msgbus(name).on((v: any) => {
    if (!!v.collection) {
      getCollection();
    }
  });
  return {
    getItems,
    schema,
    remove,
    removeMultiple,
    resource,
    entity,
    iniCollection,
    sortCollection,
    submit,
    getCollection,
    items,
    setFormkitSchema,
  };
}
