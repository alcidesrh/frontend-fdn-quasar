import { defineStore, getActivePinia } from "pinia";
import gql from "graphql-tag";
import { router } from "@/router";
import { useCloned } from "@vueuse/core";
import { EntityStore, SchemaStore } from "@/types/graphql";
import { Pagination } from "@/types/collection";
import { Dialog } from "quasar";
import { classMap } from "@/stores/models";
import Base from "@/stores/models/Api";
import storeFactory from "./storeFactory2";

interface OfType {
  kind: string;
  name: string;
  ofType: OfType | null;
}

interface Type {
  kind: string;
  name: null | string;
  ofType: OfType | null;
}

interface Field {
  name: string;
  type: OfType;
}
interface QueryArg {
  name: string;
  type: Type;
}

interface QueryType {
  name: string;
  args: Array<QueryArg>;
  type: Type;
}

interface Entity {
  kind: string;
  name: string;
  ofType: null;
  fields: Array<Field> | null;
  possibleTypes: OfType[] | null;
}
export const useSchemaStore = defineStore("schemaStore", {
  // persist: {
  //   pick: ["entities"],
  //   afterHydrate: (ctx) => {
  //     entities.value = ctx.store.$state.entities;
  //     //     mutations.value = ctx.store.$state.mutations;
  //     //     queries.value = ctx.store.$state.queries;
  //   },
  // },
  state: (): SchemaStore => ({
    entities: {},
    // queries: {},
    // mutations: {},
    // payloads: {},
  }),

  actions: {
    async loadEntities(store) {
      if (Object.keys(this.entities).length == 0) {
        const introspectionQuery = gql`
          query IntrospectionQuery {
            __schema {
              types {
                ...FullType
              }
            }
          }

          fragment FullType on __Type {
            ...TypeRef
            fields {
              name
              args {
                ...InputValue
              }
              type {
                ...TypeRef
              }
            }
            possibleTypes {
              ...TypeRef
            }
            inputFields {
              ...InputValue
            }
          }

          fragment InputValue on __InputValue {
            name
            type {
              ...TypeRef
            }
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

        this.setEntities(data.__schema);
        entities.value = this.entities;

        return;
      }

      // await this.createStores();
      // await this.createRoutes();
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
            path: `/${type.name}s`,
            // $formkit: () => import("pages/CRUDPage.vue"),
            meta: { entity: type.name },
          });
        }
      }
    },

    setEntities(schema: Record<"types", Array<Entity>>) {
      if (Object.keys(this.entities).length == 0) {
        const entities = {};
        let temp;
        schema.types
          .find((v) => v.kind == "INTERFACE")
          .possibleTypes.forEach((v) => {
            const type = schema.types.find((v2) => v.name == v2.name);
            const fields = {};
            let typeName, input, field;
            for (const f of type.fields) {
              temp = this.getInput(f);
              fields[temp.name] = temp;
            }
            this.entities[type.name] = {
              name: type.name,
              fields,
              ...this.setQueries(schema, type),
              ...this.setMutations(schema, type),
              pagination: schema.types.some(
                (v2) => v2.name == `${v.name}PageConnection`,
              ),
            };
          });
      }
    },
    setQueries(schema, entity: Entity) {
      let itemQuery = {},
        collectionQuery = {};
      const queryTypes = schema.types.find((v) => v.name == "Query").fields;
      let temp: QueryType = queryTypes.find((v: QueryType) => {
        return `${str.decapitalize(entity.name)}` == v.name;
      });
      if (temp) {
        const args = {};
        temp.args.forEach((v) => {
          args[v.name] = { type: v.type.name || v.type.ofType?.name };
        });
        itemQuery = {
          name: temp.name,
          args: args,
          type: temp.type.name || temp.type.ofType?.name,
        };
      }

      temp = queryTypes.find(
        (v) => `${str.decapitalize(entity.name)}s` == v.name,
      );
      if (!temp) {
        temp = queryTypes.find(
          (v: QueryType) => v.type.name == `${entity.name}PageConnection`,
        );
      }
      if (temp) {
        // cl(temp.args);
        const args = {};
        let argName;
        temp.args.forEach((v) => {
          argName = v.type.name || v.type.ofType?.name;
          if (argName?.endsWith("_order") || v.name?.endsWith("_list")) {
            args[v.name] = { type: `[${argName}]` };
          } else {
            args[v.name] = { type: argName };
          }
        });
        collectionQuery = {
          name: temp.name,
          args: args,
          type: temp.type.name || temp.type.ofType?.name,
        };
      }

      return { queries: { collection: collectionQuery, item: itemQuery } };
    },
    setMutations(schema, entity: Entity) {
      let mutations = {},
        temp = {};
      const mutationsTypes = schema.types
        .find((v) => v.name == "Mutation")
        .fields.filter((v: Field) =>
          [
            `create${entity.name}`,
            `update${entity.name}`,
            `delete${entity.name}`,
          ].includes(v.name),
        )
        .forEach((element: QueryType) => {
          temp = {};
          temp = element.name.startsWith("create")
            ? "create"
            : element.name.startsWith("update")
              ? "update"
              : "delete";

          mutations[temp] = { name: element.name, args: {} };
          let input, t;
          element.args.forEach((v) => {
            mutations[temp].args[v.name] = {};
            t = v.type.name || v.type.ofType?.name;
            mutations[temp].args[v.name][t] = {};
            input = schema.types.find((v: Type) => v.name == t);
            input.inputFields.forEach((element) => {
              mutations[temp].args[v.name][t][element.name] = {
                type: element.type.name || element.type.ofType?.name,
              };
            });
          });
        });
      return { mutations: mutations };
    },
    getInput(f) {
      let field = { name: f.name, input: {} };
      if (f.type.kind == "SCALAR") {
        field.type = f.type.name;
      } else if (f.type.kind == "NON_NULL") {
        field.input.required = true;
        if (f.type.ofType.kind == "SCALAR") {
          field.type = f.type.ofType.name;
        } else {
          field.type = f.type.ofType.kind;
          field.relatedTo = f.type.ofType.name;
          if (f.type.ofType.kind == "LIST") {
            field.input.multiple = true;
          }
        }
      } else {
        field.type = f.type.kind;
        if (f.type.kind == "LIST") {
          field.relatedTo = f.type.ofType.name;
          field.input.multiple = true;
        } else {
          field.relatedTo = f.type.name;
        }
      }
      switch (field.type) {
        case "String":
          field.input["$formkit"] = "text";
          break;
        case "Int":
        case "Float":
          field.input["$formkit"] = "number";
          break;
        case "Boolean":
          field.input["$formkit"] = "checkbox";
          break;
        case "Date":
          field.input["$formkit"] = "datetime";
          break;
        default:
          field.input["$formkit"] = "select";
      }

      return field;
    },
  },
});
