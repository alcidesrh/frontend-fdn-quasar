import type { Mutation, Query } from "~/graphql/graphql";
import type { Field as CustomField } from "~/graphql/parse/src";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";
import type { Collection, Pagination } from "~/types/collection";
import type { EntityInterface } from "~/types/entity";

interface props {
  name: string;
  fields: Array<
    Record<
      "name" | "type" | "reference",
      string | null | Array<Record<"name" | "type", string>>
    >
  >;
}

interface Base {
  id: string;
  _id: number;
}

export const user: Ref<User> = ref();

export const fdn = ref({
  resources: {} as ReadonlyArray<IntrospectionType>,
  queries: {} as Query[],
  mutations: {} as Mutation[],
  payload: {} as any[],
  input: {} as any[],
  isReady: computed(() => Object.keys(fdn.value.resources).length),
  load: async function () {
    if (!this.isReady) {
      await this.refresh();
    }
  },
  refresh: async () => {
    await useMetadataStore().setApiMetadata(true);
  },
});

export class Entity<Type> implements EntityInterface {
  name: string;
  camelCase: string;
  plural: string;
  fields: CustomField[];
  columns: CustomField[];
  collection: Ref<Collection>;
  item: Ref<Type & Base>;
  payload: object;
  input: object;
  excludeFormFields: string[];
  endpoints: Record<
    "get" | "create" | "update" | "delete" | "form" | "crud" | "collection",
    string
  >;
  constructor(name: string, options: Record<string, any> = {}) {
    this.name = name;

    this.item = ref({});

    this.fields = fdn.value.resources[name].fields;

    this.excludeFormFields = [];

    this.columns = [];

    this.payload = this.input = {};
    ["create", "update", "delete"].forEach((v) => {
      const temp = `${v + name}Payload`;
      const temp2 = `${v + name}Input`;
      this.payload[temp] = fdn.value.payload[temp];
      this.input[temp2] = fdn.value.input[temp2];
    });

    this.camelCase = str.camelCase(name);
    this.plural = str.lowerCase(this.camelCase) + "s";
    const capitalize = str.capitalize(name);

    this.endpoints = {
      get: this.camelCase,
      form: "getFormResource",
      crud: "crudAgnostic",
      collection: `${this.plural}`,
      create: `${this.plural}-create`,
      update: `${this.plural}-id-edit`,
      delete: `delete${capitalize}`,
    };
    // const pascalCase = useChangeCase(name, 'pascalCase').value;
    // ['create', 'update', 'delete'].forEach(
    // 	(v) => (this.endpoints[v] = v + pascalCase),
    // );

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    this.collection = ref({
      menu: "editar",
      columns: [],
      pagination: ref({
        page: 1,
        itemsPerPage: 15,
        order: [{ id: "ASC" }],
      }) as Ref<Pagination>,
      items: [],
      orderField: "id",
      orderType: "ASC",
      loading: false,
      hasFilter: false,
      filters: {},
      args: computed(() => {
        return {
          ...this.collection.value.filters,
          ...this.collection.value.pagination,
        };
      }),
    });
  }

  setColumns(fields: []) {
    this.columns = this.fields.filter((v) => fields.includes(v.name));
  }

  getQueryFields(deep = 1) {
    const fields = Object.keys(this.item);

    return this.fields
      .filter(
        (v) =>
          !this.excludeFormFields.includes(v.name) &&
          (!fields.length ||
            fields.includes(v.name) ||
            ["id", "_id"].includes(v.name)),
      )
      .map((v) => Entity.prepareField(v, deep));
  }

  getMutationFields() {
    const mutateInfo = fdn.value.mutations[this.getMutationOperation()];
    const root: any = {};
    root[
      fdn.value.payload[mutateInfo.type.name].fields.find(
        (v: Record<"name", string>) => v.name !== "clientMutationId",
      ).name
    ] = this.getQueryFields();

    return [root]; // root[fdn.value.payload[mutateInfo.type.name].fields.find((v) => v.name != 'clientMutationId').name];
  }

  getIriFromId(id?: string | Record<"id", string>): string {
    return id?.id || `/api/${this.name.toLowerCase()}s/${id || this.item._id}`;
  }

  getMutationOperation(operation = null): string {
    const pascalCase = str(this.name).camelCase().capitalize();
    return this.item.id ? `update${pascalCase}` : `create${pascalCase}`;
  }

  static prepareField(v: any, deep = 2, loop = 1) {
    if (
      v.type.kind == "SCALAR" ||
      v.type.kind == "ENUM" ||
      (v?.type.kind == "NON_NULL" && v.type?.ofType?.kind == "SCALAR")
    ) {
      return v.name;
    } else if (loop > deep) {
      return false;
    } else {
      let temp = {};

      if (v.type.kind == "OBJECT" && v.type.name) {
        if (v.type.name.endsWith("PageConnection")) {
          const r = fdn.value.resources[v.type.name].fields.find(
            (v) => v.type.kind == "LIST",
          ).type.ofType.name;
          temp[v.name] = [
            {
              collection: fdn.value.resources[r].fields
                .map((v) => Entity.prepareField(v, deep, loop + 1))
                .filter((v) => v),
            },
          ];
        } else if (v.type.name.endsWith("CursorConnection")) {
          const r = fdn.value.resources[v.type.name].fields.find(
            (v) => v.name == "edges",
          ).type.ofType.name;
          const r2 = fdn.value.resources[r].fields.find((v) => v.name == "node")
            .type.name;
          temp[v.name] = [
            {
              edges: [
                {
                  node: fdn.value.resources[r2].fields
                    .map((v) => Entity.prepareField(v, deep, loop + 1))
                    .filter((v) => v),
                },
              ],
            },
          ];
        } else {
          temp[v.name] = ["id"];
          // fdn.value.resources[v.type.name].fields
          // .map((v) => Entity.prepareField(v, deep, loop + 1))
          // .filter((v) => v);
        }
      } else if (v.type.kind == "LIST") {
        if (v.type.ofType.kind == "OBJECT") {
          temp[v.name] = ["id"];
          // fdn.value.resources[v.type.ofType.name].fields
          // .map((v) => Entity.prepareField(v, deep, loop + 1))
          // .filter((v) => v);
        }
      }
      return temp;
    }
  }

  prepareFieldForCollection(v?: any, deep = 2, loop = 1) {
    let temp = [],
      temp2,
      temp3;
    if (!v) {
      temp2 = fdn.value.queries[this.endpoints.collection];
      cl(this.endpoints.collection);
      if (temp2.type.kind == "OBJECT") {
        temp2 = fdn.value.resources[temp2.type.name];
        temp2.fields.forEach((i) => {
          temp3 = {};
          if (i.name == "collection") {
            temp3[i.name] = [
              "_id",
              ...this.columns.map((i) =>
                this.prepareFieldForCollection(i, deep, loop),
              ),
            ];
          } else if (fdn.value.resources[i.type.ofType.name]?.fields) {
            temp3[i.name] = fdn.value.resources[i.type.ofType.name]?.fields.map(
              (i) => this.prepareFieldForCollection(i, deep, loop),
            );
          } else {
            temp3 = i.name;
          }
          temp.push(temp3);
        });
      } else if (temp2.type.kind == "LIST") {
        temp = fdn.value.resources[temp2.type.ofType.name].fields.map((i) =>
          this.prepareFieldForCollection(i, deep, loop),
        );
      }
    } else if (
      v.type.kind == "SCALAR" ||
      v.type.kind == "ENUM" ||
      (v?.type.kind == "NON_NULL" && v.type?.ofType?.kind == "SCALAR")
    ) {
      return v.name;
    } else if (loop > deep) {
      return false;
    } else {
      if (v.type.kind == "OBJECT" && v.type.name) {
        if (v.type.name.endsWith("PageConnection")) {
          const r = fdn.value.resources[v.type.name].fields.find(
            (v) => v.type.kind == "LIST",
          ).type.ofType.name;
          temp[v.name] = [
            {
              collection: ["label"],
              // fdn.value.resources[r].fields
              // .map((v) => Entity.prepareField(v, deep, loop + 1))
              // .filter((v) => v),
            },
          ];
        } else if (v.type.name.endsWith("CursorConnection")) {
          const r = fdn.value.resources[v.type.name].fields.find(
            (v) => v.name == "edges",
          ).type.ofType.name;
          const r2 = fdn.value.resources[r].fields.find((v) => v.name == "node")
            .type.name;
          temp[v.name] = [
            {
              edges: [
                {
                  node: fdn.value.resources[r2].fields
                    .map((v) => Entity.prepareField(v, deep, loop + 1))
                    .filter((v) => v),
                },
              ],
            },
          ];
        } else {
          temp[v.name] = fdn.value.resources[v.type.ofType.name].fields.map(
            (i) => this.prepareFieldForCollection(i, deep, loop),
          );
        }
      } else if (v.type.kind == "LIST") {
        if (v.type.ofType.kind == "OBJECT") {
          temp[v.name] = fdn.value.resources[v.type.ofType.name].fields.map(
            (i) => this.prepareFieldForCollection(i, deep, loop),
          );
        }
      }
    }
    return temp;
  }

  static prepareVariables(
    object: {},
    excludeValues: string[] = ["_id", "__typename"],
  ) {
    if (typeof object == "string") {
      return !excludeValues.includes(object) ? object : null;
    }
    const newObject = {};
    Object.keys(object).forEach((key) => {
      if (object[key]) {
        if (Array.isArray(object[key])) {
          const temp: {}[] = [];
          let temp2;
          object[key].forEach((v) => {
            temp2 = Entity.prepareVariables(v);
            if (temp2) {
              temp.push(temp2);
            }
          });
          newObject[key] = temp;
        } else if (typeof object[key] === "object") {
          if (object[key].id) {
            newObject[key] = object[key].id;
          } else if (key == "group") {
            const group = object[key];
            Object.keys(group).forEach((key) => {
              if (group[key]) {
                newObject[key] = Entity.prepareVariables(group[key]);
              }
            });
          } else {
            newObject[key] = Entity.prepareVariables(object[key]);
          }
        } else {
          if (!excludeValues.includes(key)) {
            newObject[key] = object[key];
          }
        }
      }
    });

    return newObject;
  }
}
