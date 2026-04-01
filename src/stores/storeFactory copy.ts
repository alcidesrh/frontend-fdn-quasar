import { defineStore, getActivePinia } from "pinia";
import gql from "graphql-tag";
import { router } from "@/router";
import * as queryBuilder from "gql-query-builder";
import { useCloned } from "@vueuse/core";
import { EntityModel, EntityStore } from "@/types/graphql";
import { Pagination } from "@/types/collection";
import { Dialog } from "quasar";
import Api from "@/stores/models/Api";
import persist from "./persist";
import { classMap } from "@/stores/models";
export default async (key: string) => {
  const type = entities.value[key];
  const nameDecapitalize = str.decapitalize(key);
  const storeId = `${nameDecapitalize}Store`;

  const model =
    typeof classMap[type.name] != "undefined"
      ? new classMap[type.name](type.name)
      : new Api(type.name);

  const state: EntityStore = {
    entity: model,
    items: [],
    item: {},
    options: [],
    fields: useCloned(type.fields).cloned.value,
    filters: {},
    // visibleColumns: entityConfig.collectionFieldConfig.filter((v) => v.visible),
    columns: [],
    computedColumns: [],
    orderField: "id",
    orderType: "DESC",
    formSchema: [],
    formData: {},
  };
  if (entities.value[type.name].pagination) {
    state.pagination = {
      itemsPerPage: 15,
      lastPage: null,
      totalCount: null,
      currentPage: 1,
      hasNextPage: null,
    };
  }

  return await defineStore(storeId, {
    // persist: {
    //   ...persist,
    // },
    state: (): EntityStore => state,

    actions: {
      async collection(fetchPolicy = "cache-first") {
        if (this.columns.length == 0) {
          await this.getColumns();
        }
        const { variablesTypes, variablesValues } = this.getCollectionVariables(
          this.collectionEndpoint,
        );
        const qb = queryBuilder.query({
          operation: this.collectionEndpoint, // convención API Platform / Hydra
          variables: variablesTypes,
          fields: this.collectionFieldConfigs(),
        });
        const { data } = getApolloClient()
          .query({
            query: gql(qb.query),
            variables: variablesValues,
            fetchPolicy: fetchPolicy,
          })
          .then(({ data }) => {
            if (typeof this.pagination != "undefined") {
              this.items = data[this.collectionEndpoint].collection;
              const p = data[this.collectionEndpoint]
                .paginationInfo as Pagination;
              this.pagination.currentPage = p.currentPage;
              this.pagination.itemsPerPage = p.itemsPerPage;
              this.pagination.totalCount = p.totalCount;
              this.pagination.lastPage = p.lastPage;
              this.pagination.hasNextPage = p.hasNextPage;
            } else {
              this.items = data[this.collectionEndpoint];
            }
            nextTick(() => highlighted(this.computedColumns, this.filters));
          });
      },
      async getItem(id?) {
        let query = queryBuilder.query({
          operation: this.nameDecapitalize,
          variables: Api.getQueryVariables(this.nameDecapitalize),
          fields: this.entity.getQueryFields(),
        });

        const {
          data: { user },
        } = await getApolloClient().query({
          query: gql(query.query),
          variables: { id: this.entity.getIriFromId(id) },
          fetchPolicy: "cache-first",
        });
        this.item = user;
      },
      async getFormSchema() {
        if (this.formSchema.length == 0) {
          this.formSchema = await this.entity.getForm(this.fields);
        }

        this.formData = await this.entity.getFormData(this.fields);
      },
      async getColumns() {
        const { fetchConfig } = useEntityConfig();
        const entityConfig = await fetchConfig(this.entity.name);
        for (
          let index = 0, v;
          index < entityConfig.collectionFieldConfig.length;
          index++
        ) {
          v = entityConfig.collectionFieldConfig[index];

          if (v.filterable) {
            v.schema = {
              $formkit: v.type == "text" ? "text_search" : v.type,
              name: v.field,
              id: v.id,
              loading: "$loading",
              outerClass: "mb-0!",
              dense: true,
            };
            if (v.type == "datetime") {
              v.schema.range = true;
            } else if (v.type == "multiple") {
              v.schema.$formkit = "select";
              v.schema.multiple = true;
              // v.schema.options = [{ id: 4, label: 67 }];
            }

            if (v.schema.$formkit == "select") {
              const store = await useStoreByName(v?.relatedTo);
              const { data } = await store.entity.getOptions();
              v.schema.options = data.collectionAgnostic.data;
            }
          }
          this.columns.push(v);
        }
        // const columns = entityConfig.collectionFieldConfig.map(async (v) => {});
        this.setComputedColumns();

        return;

        let query = queryBuilder.query({
          operation: "columnsMetadataResource",
          variables: { resource: { value: this.name.toUpperCase() } },
          fields: ["data"],
        });
        const result = await getApolloClient().query({
          query: gql(query.query),
          variables: { resource: this.name.toUpperCase() },
          fetchPolicy: "cache-first",
          // context: { collection: true },
        });
        const {
          data: {
            columnsMetadataResource: { data },
          },
        } = result;
        this.columns = data.map((v) => {
          const temp = useCloned(v).cloned.value;
          if (temp.schema) {
            temp.schema.clear = "$clear";
          }
          return temp;
        });
        this.setComputedColumns();
      },
      setComputedColumns() {
        this.computedColumns = this.columns.filter((v) => v.visible);
      },
      collectionFieldConfigs(q = null) {
        let temp,
          fields = [
            "_id",
            ...this.fields
              .filter((v) => this.visibleColumns.includes(v.name))
              .map((v) => {
                temp = {};
                if (v.type.name && v.type.name.endsWith("PageConnection")) {
                  temp[v.name] = [{ collection: ["id", "label"] }];
                  return temp;
                } else if (
                  v.type.kind == "LIST" ||
                  v.type.kind == "OBJECT" ||
                  (v.type.kind == "NON_NULL" && v.type.ofType.kind == "OBJECT")
                ) {
                  temp[v.name] = ["id", "label"];
                  return temp;
                } else {
                  return v.name;
                }
              }),
          ];
        if (typeof this.pagination != "undefined") {
          return [
            {
              paginationInfo: Object.keys(this.pagination),

              collection: fields,
            },
          ];
        }
        return fields;
      },
      remove(arg?) {
        if (!arg) {
          arg = this.item;
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
            const temp = arg || this.item,
              operation = `delete${this.name}`;
            const fields = {};
            fields[str.decapitalize(this.name)] = ["id"];
            const variablesTypes = Api.getMutationVariables(
              `delete${this.name}`,
            );
            const query = queryBuilder.mutation({
              operation,
              variables: variablesTypes, //getMutationArgs(operation),
              fields: [fields],
            });
            getApolloClient()
              .mutate({
                mutation: gql(query.query),
                variables: { input: { id: this.entity.getIriFromId(arg) } },
              })
              .then(() => {
                bus.emit("positive", getAlertText("remove_after"));
                this.collection("network-only");
                if (router.currentRoute.value.name != "list") {
                  router.push({
                    name: "list",
                    params: { entity: this.name },
                  });
                }
              });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },

      removeMultiple(items: Ref<[any]> | any) {
        Dialog.create({
          title: "Eliminar",
          message: getAlertText("remove", `${items.length} elementos`),
          cancel: true,
          persistent: true,
          html: true,
        }).onOk(() => {
          const fields = { agnostic: ["id"] };
          const temp = Array.isArray(items) ? items : [items];

          const query = queryBuilder.mutation({
            operation: "deleteAgnostic",
            variables: Api.getMutationVariables("deleteAgnostic"), //getMutationArgs(operation),
            fields: [fields],
          });

          getApolloClient()
            .mutate({
              mutation: gql(query.query),
              variables: {
                input: {
                  resource: this.name,
                  ids: temp.map((i: any) => i._id),
                },
              },
            })
            .then(() => {
              bus.emit("positive", getAlertText("remove_after"));
              this.collection("network-only");
            });
        });
      },
      getCollectionVariables(operation = null) {
        const value = {
          currentPage: this.pagination.currentPage,
          itemsPerPage: this.pagination.itemsPerPage,
          ...useCloned(this.filters).cloned.value,
        };

        if (this.orderField) {
          const temp2 = {};
          temp2[this.orderField] = this.orderType;
          value.order = [temp2];
        }

        const temp = this.computedColumns.filter(
          (v) => v.filterable && v.schema && v.schema.multiple,
        );
        temp.forEach((v) => {
          if (typeof value[v.field] != "undefined") {
            value[`${v.field}_id_list`] = value[v.field].map((v) =>
              getIdFromIri(v.id),
            );
            delete value[v.field];
          }
        });
        // delete value.

        return {
          variablesTypes: Api.getQueryVariables(operation),
          variablesValues: value,
        };
      },

      getOptions() {
        if (this.options.length == 0) {
          this.entity
            .getOptions()
            .then(
              ({ data }) => (this.options = data["collectionAgnostic"].data),
            );
        }
      },
      orderColumns(i, to) {
        const temp = this.computedColumns[i];
        if (to == "left" && i != 0) {
          this.computedColumns[i] = this.computedColumns[i - 1];
          this.computedColumns[i - 1] = temp;
        } else if (to != "left" && i + 1 <= this.columns.length) {
          this.computedColumns[i] = this.computedColumns[i + 1];
          this.computedColumns[i + 1] = temp;
        }
      },
      submit(data) {
        const temp = {};
        temp[this.nameDecapitalize] = this.entity.getQueryFields();
        const query = queryBuilder.mutation({
          operation: this.mutationOperation,
          variables: Api.getMutationVariables(this.mutationOperation),
          fields: ["clientMutationId"],
        });
        return getApolloClient()
          .mutate({
            mutation: gql(query.query),
            variables: { input: data },
          })
          .then(() => {
            bus.emit("positive", getAlertText());
            this.collection("network-only");
            if (router.currentRoute.value.name != "list") {
              router.push({
                name: "list",
                params: { entity: this.name },
              });
            }
          });
      },
    },
    getters: {
      name: (s) => s.entity.name,
      nameDecapitalize: (s) => s.entity.nameDecapitalize,
      collectionEndpoint: (s) => `${s.nameDecapitalize}s`,
      quasarPagination: (s) => {
        return {
          sortBy: s.orderField,
          descending: s.orderType == "DESC",
          page: s.pagination.currentPage,
          rowsPerPage: s.pagination.itemsPerPage,
          rowsNumber: s.pagination.totalCount,
        };
      },
      mutationOperation: (s) =>
        s.item.id ? `update${s.name}` : `create${s.name}`,
      visibleColumns: (s) =>
        s.columns.filter((v) => v.visible).map((v) => v.field),
    },
  });
};
