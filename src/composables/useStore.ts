import type { Ref } from "vue";
import type { Collection } from "~/types/collection";
import type { SelectOption } from "~/types/fdn";
import { useChangeCase } from "@vueuse/integrations/useChangeCase.mjs";
import { en } from "@formkit/i18n";
import { useCloned } from "@vueuse/core";
import { useWindowScroll } from "@vueuse/core";
import { PaginationQuasar } from "@/types/collection";
import { Dialog } from "quasar";
import { router } from "@/router";

const original = ref({ key: "value" });

const { cloned } = useCloned(original);

original.value.key = "some new value";

export function createStore<Type>(
  name: string,
  options: Record<string, any> = {},
) {
  let items: Ref<Array<SelectOption> | []> = ref([]);

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
        variables.id = id;
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
  }

  function remove(arg?) {
    if (!arg) {
      arg = entity.value.item;
    }
    Dialog.create({
      title: "Eliminar",
      message: getAlertText(
        "remove",
        arg?.nombre || arg?.label || arg.id || "este elemento.",
      ),
      cancel: true,
      persistent: true,
      html: true,
    })
      .onOk(() => {
        const temp = arg || entity.value.item;
        const fields = {};
        fields[entity.value.camelCase] = ["id"];
        apollo
          .mutate(
            entity.value.endpoints.delete,
            { id: entity.value.getIriFromId(temp) },
            [fields],
          )
          .then(() => {
            bus.emit("positive", getAlertText("remove_after"));
            getCollection({ fetchPolicy: "network-only" });
            if (router.currentRoute.value.name != "list") {
              router.push({ name: "list", params: { entity: entity.name } });
            }
          });
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }

  function removeMultiple(items: Ref<[any]> | any) {
    Dialog.create({
      title: "Eliminar",
      message: getAlertText("remove", `${items.length} elementos`),
      cancel: true,
      persistent: true,
      html: true,
    }).onOk(() => {
      const fields = { agnostic: ["id"] };
      const temp = Array.isArray(items) ? items : [items];
      cl(temp);
      apollo
        .mutate({
          operation: "deleteAgnostic",
          variables: {
            resource: entity.value.name,
            ids: temp.map((i: any) => getIdFromIri(i.id)),
          },
          fields: [fields],
        })
        .then(() => {
          bus.emit("positive", getAlertText("remove_after"));
          getCollection({ fetchPolicy: "network-only" });
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
        return resolve(true);
      }

      return apollo
        .query({
          operation: "columnsMetadataResource",
          variables: { resource: entity.value.name },
          fields: ["data"],
        })
        .then(({ data, networkStatus }) => {
          if (typeof data == "undefined" && networkStatus == 1) {
            return;
          }

          setColumns(data.columnsMetadataResource.data);

          if (entity.value.collection.visibleColumns.length == 0) {
            entity.value.collection.visibleColumns =
              entity.value.collection.columns.map((v) => v.field);
            entity.value.collection.computedColumns =
              entity.value.collection.columns;
          }

          resolve(true);
        });
    });
  }
  function setColumns(data) {
    const collection = entity.value.collection;
    collection.columns = (data.collection as any).map((i) => {
      const temp: any = useCloned(i).cloned.value;
      if (temp.schema) {
        const eventbus = name;
        temp.schema = { ...temp.schema, ...{ eventbus } };
      }
      return temp;
    });
  }
  function sortCollection(field: string, order: boolean) {
    const collection = entity.value.collection;
    if (collection.orderField == field) {
      order = order ? "DESC" : "ASC";
      if (collection.orderType != order) {
        collection.orderType = order;
      }
    } else {
      collection.pagination.page = 1;
      collection.orderField = field;
      collection.orderType = "ASC";
    }
    const temp = {} as any;
    temp[collection.orderField] = collection.orderType;
    collection.pagination.order = [temp];
  }
  function getCollection({
    fetchPolicy = "",
    pagination,
  }: { fetchPolicy?: string; pagination?: PaginationQuasar } = {}) {
    return new Promise((resolve, reject) => {
      if (pagination) {
        const { page, rowsPerPage, rowsNumber, sortBy, descending } =
          pagination;
        entity.value.collection.pagination.page = page;
        entity.value.collection.pagination.itemsPerPage =
          rowsPerPage || rowsNumber;

        sortCollection(sortBy, descending);
      }
      return apollo.collection(entity, fetchPolicy).then((data) => {
        if (typeof data == "undefined" && networkStatus == 1) {
          return;
        }
        // const { y: scrollY } = useWindowScroll();
        // scrollY.value = 0;
        const temp = data.data[entity.value.endpoints.collection];

        if (!Array.isArray(temp)) {
          const { collection, paginationInfo } =
            data.data[entity.value.endpoints.collection];
          entity.value.collection.pagination = {
            ...paginationInfo,
            page: entity.value.collection.pagination.page,
            order: entity.value.collection.pagination.order,
          };
          entity.value.collection.items = collection;
        } else {
          entity.value.collection.items = temp;
        }
        resolve(true);
      });
      // .finally(() => cloading.value--);
      // .catch((error) => {

      // });
    });
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
      router.push({ name: entity.value.routes.list });
    });
  }
  function orderColumns(i, to) {
    const temp = entity.value.collection.computedColumns[i];
    if (to == "left" && i != 0) {
      entity.value.collection.computedColumns[i] =
        entity.value.collection.computedColumns[i - 1];
      entity.value.collection.computedColumns[i - 1] = temp;
    } else if (
      to != "left" &&
      i + 1 <= entity.value.collection.columns.length
    ) {
      entity.value.collection.computedColumns[i] =
        entity.value.collection.computedColumns[i + 1];
      entity.value.collection.computedColumns[i + 1] = temp;
    }
  }
  watch(
    () => entity.value.collection.items,
    () => {
      nextTick(() => highlighted(entity.value.collection));
    },
  );

  watchEffect(() => {
    entity.value.collection.paginationQuasar = {
      sortBy: entity.value.collection.orderField,
      descending: entity.value.collection.orderType == "DESC",
      page: entity.value.collection.pagination.currentPage,
      rowsPerPage: entity.value.collection.pagination.itemsPerPage,
      rowsNumber: entity.value.collection.pagination.totalCount,
    };
  });

  // watchEffect(() => {
  //   entity.value.collection.computedColumns =
  //     entity.value.collection.columns.filter((v) =>
  //       entity.value.collection.visibleColumns.includes(v.field),
  //     );
  // });

  bus.on(name, (v: any) => {
    getCollection();
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
    orderColumns,
  };
}
