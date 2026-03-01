import { defineStore, getActivePinia } from "pinia";
import gql from "graphql-tag";
import { router } from "@/router";
import * as queryBuilder from "gql-query-builder";
import { useCloned } from "@vueuse/core";
import { vElementBounding } from "@vueuse/components";
import { EntityStore, SchemaStore, State } from "@/types/graphql";
import { Pagination } from "@/types/collection";

export const useSchemaStore = defineStore("schemaStore", {
  // persist: true, // pinia-plugin-persistedstate
  state: (): SchemaStore => ({
    entities: {},
    queries: {},
    mutations: {},
  }),

  actions: {
    async getSchema(store) {
      if (Object.keys(this.entities).length == 0) {
        const introspectionQuery = gql`
          query {
            __schema {
              types {
                ...FullType
              }
            }
          }
          fragment FullType on __Type {
            kind
            name

            fields(includeDeprecated: true) {
              name

              args {
                ...InputValue
              }
              type {
                ...TypeRef
              }
            }
            inputFields {
              ...InputValue
            }
            interfaces {
              ...TypeRef
            }
            enumValues(includeDeprecated: true) {
              name

              isDeprecated
              deprecationReason
            }
            possibleTypes {
              ...TypeRef
            }
          }

          fragment InputValue on __InputValue {
            name

            type {
              ...TypeRef
            }
            defaultValue
          }

          fragment TypeRef on __Type {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                          ofType {
                            kind
                            name
                            ofType {
                              kind
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        const { data } = await getApolloClient().query({
          query: introspectionQuery,
        });
        data.__schema.types
          .find((v) => v.name == "Query")
          .fields.forEach((v) => {
            if (v.type.kind != "INTERFACES") {
              this.queries[v.name] = v;
            }
          });
        data.__schema.types
          .find((v) => v.name == "Mutation")
          .fields.forEach((v) => {
            if (v.type.kind != "INTERFACES") {
              this.mutations[v.name] = v;
            }
          });
        data.__schema.types.forEach((v) => {
          if (
            v.name != "Mutation" &&
            v.name != "Query" &&
            v.fields &&
            !v.name.startsWith("_")
          ) {
            this.entities[v.name] = v;
          }
        });
        entities.value = this.entities;
        queries.value = this.queries;
        mutations.value = this.mutations;
        // cl("QUERY ===> ", this.query);
        // cl("MUTATIONs ===> ", this.mutation);
        // cl("TYPES ===> ", this.types);
      }

      await this.createStores();
      await this.createRoutes();
    },
    async createStores() {
      const piniaInstance = getActivePinia();
      let type;
      for (const key in this.entities) {
        type = this.entities[key];
        if (
          !type.name.endsWith("Connection") &&
          !type.name.endsWith("Edge") &&
          !type.name.endsWith("PageInfo") &&
          !type.name.endsWith("Resource") &&
          !type.name.endsWith("Payload") &&
          !type.name.endsWith("PaginationInfo")
        ) {
          const storeId = `${type.name.toLowerCase()}Store`;
          if (piniaInstance._s.has(storeId)) {
            return;
          }

          const state = {
            name: type.name,
            items: [],
            fields: type.fields,
            filters: {},
            visibleColumns: [],
            columns: [],
            computedColumns: [],
            orderField: "id",
            orderType: "DESC",
          };
          if (
            typeof entities.value[`${type.name}PageConnection`] != "undefined"
          ) {
            state.pagination = {
              itemsPerPage: 15,
              lastPage: null,
              totalCount: null,
              currentPage: 1,
              hasNextPage: null,
            };
          }
          const useStore = defineStore(storeId, {
            state: (): EntityStore => state,

            actions: {
              async collection() {
                await this.getColumns();
                const { variablesTypes, variablesValues } = this.variables;

                const qb = queryBuilder.query({
                  operation: this.collectionEndpoint, // convención API Platform / Hydra
                  variables: variablesTypes,
                  fields: this.collectionFields(),
                });
                const { data } = await getApolloClient().query({
                  query: gql(qb.query),
                  variables: variablesValues,
                });
                // Estructura típica de API Platform GraphQL (Hydra)
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

                // cl(this.items);
                // // collection?.edges?.map((edge) => edge.node) || collection || [];
                // this.pagination.total =
                //   collection?.totalCount || collection?.pageInfo?.total || 0;
              },

              form() {
                const fields = type.fields || [];
                const formSchema = [];
                const gridContainer = {
                  $el: "div",
                  attrs: {
                    class:
                      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4", // Responsive por breakpoints
                  },
                  children: [],
                };
                this.fields.forEach((field) => {
                  if (field.args && field.args.length > 0) return;

                  let fieldType = field.type;
                  while (fieldType.ofType) fieldType = fieldType.ofType;

                  const isRequired = field.type.kind === "NON_NULL";
                  let fkType = "text"; // Default
                  let attrs = {};

                  // Mapeo similar al JS anterior
                  if (fieldType.kind === "SCALAR") {
                    if (fieldType.name === "String")
                      fkType = field.name.includes("password")
                        ? "password"
                        : "text";
                    if (fieldType.name === "Int" || fieldType.name === "ID")
                      fkType = "number";
                    if (fieldType.name === "Date") fkType = "datepicker";
                  } else if (fieldType.kind === "ENUM") fkType = "select";
                  else if (
                    fieldType.kind === "OBJECT" ||
                    fieldType.kind === "LIST"
                  ) {
                    fkType = "select";
                    attrs.multiple = fieldType.kind === "LIST";
                  }

                  gridContainer.children.push({
                    $formkit: fkType,
                    name: field.name,
                    label:
                      field.name.charAt(0).toUpperCase() + field.name.slice(1),
                    validation: isRequired ? "required" : "",
                    ...attrs,
                  });
                });

                formSchema.push(gridContainer);
                formSchema.push({
                  $el: "button",
                  attrs: {
                    type: "submit",
                    class: "w-full bg-blue-500 text-white py-2 rounded",
                  },
                  children: "Enviar",
                });

                return formSchema;
              },
              async getColumns() {
                if (this.columns.length == 0) {
                  let query = queryBuilder.query({
                    operation: "columnsMetadataResource",
                    variables: { resource: { value: this.name } },
                    fields: ["data"],
                  });

                  query = gql`
                    ${query.query}
                  `;
                  const result = await getApolloClient().query({
                    query,
                    variables: { resource: this.name },
                    fetchPolicy: "cache-first",
                    // context: { collection: true },
                  });
                  const {
                    data: {
                      columnsMetadataResource: { data },
                    },
                  } = result;
                  this.columns = data;
                  this.computedColumns = this.columns;
                  this.visibleColumns = data.map((v) => v.field);
                }
                c;
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
              collectionFields(q = null) {
                let temp,
                  fields = this.fields
                    .filter((v) => this.visibleColumns.includes(v.name))
                    .map((v) => {
                      temp = {};
                      if (
                        v.type.name &&
                        v.type.name.endsWith("PageConnection")
                      ) {
                        temp[v.name] = [{ collection: ["id", "label"] }];
                        return temp;
                      } else if (
                        v.type.kind == "LIST" ||
                        v.type.kind == "OBJECT"
                      ) {
                        temp[v.name] = ["id", "label"];
                        return temp;
                      } else {
                        return v.name;
                      }
                    });
                fields = ["_id", ...fields];
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
            },
            getters: {
              collectionEndpoint: (s) => `${s.name.toLowerCase()}s`,
              quasarPagination: (s) => {
                return {
                  sortBy: s.orderField,
                  descending: s.orderType == "DESC",
                  page: s.pagination.currentPage,
                  rowsPerPage: s.pagination.itemsPerPage,
                  rowsNumber: s.pagination.totalCount,
                };
              },
              variables: (s) => {
                const temp = {};
                queries.value[s.collectionEndpoint].args.forEach((v) => {
                  if (v.type.ofType) {
                    if (v.type.kind == "LIST") {
                      temp[v.name] = { type: `[${v.type.ofType.name}]` };
                    } else if (v.type.kind == "NON_NULL") {
                      temp[v.name] = { type: `${v.type.ofType.name}!` };
                    }
                  } else {
                    temp[v.name] = { type: v.type.name };
                  }
                });
                // return temp;

                const value = {
                  currentPage: s.pagination.currentPage,
                  itemsPerPage: s.pagination.itemsPerPage,
                  ...s.filters,
                };

                if (s.orderField) {
                  const temp2 = {};
                  temp2[s.orderField] = s.orderType;
                  value.order = [temp2];
                }

                return { variablesTypes: temp, variablesValues: value };
              },
            },
            persist: {
              ...persist,
              afterHydrate: (ctx) => {
                cl(ctx);
              },
            }, // pinia-plugin-persistedstate
          });

          // Registrar la store dinámicamente
          useStore(piniaInstance);
        }
      }
    },
    async createRoutes() {
      let type;
      for (const key in this.entities) {
        type = this.entities[key];
        if (
          !type.name.endsWith("Connection") &&
          !type.name.endsWith("Edge") &&
          !type.name.endsWith("PageInfo") &&
          !type.name.endsWith("Resource") &&
          !type.name.endsWith("Payload") &&
          !type.name.endsWith("PaginationInfo")
        ) {
          router.addRoute({
            name: type.name,
            path: `/${type.name.toLowerCase()}s`,
            // component: () => import("pages/CRUDPage.vue"),
            meta: { entity: type.name },
          });
        }
      }
    },
  },
});
