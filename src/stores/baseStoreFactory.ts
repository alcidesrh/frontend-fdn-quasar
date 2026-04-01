// plugins/piniaEntityPlugin.ts
import * as queryBuilder from "gql-query-builder";
import type { PiniaPluginContext } from "pinia";
import { nextTick } from "vue";
import { storeToRefs } from "pinia";
import { Dialog } from "quasar";
import { useCloned } from "@vueuse/core";
import Api from "@/stores/models/Api";
import { gql } from "@apollo/client/core";
import { isVariableStatement } from "typescript";
import persist from "@/stores/persist";
import { Column, EntityStore } from "@/types/graphql";
// Configuración base consolidada
const baseState = (entity) => {
  const state: EntityStore = {
    name: entity,
    entity: {},
    items: [] as any[],
    item: {} as any,
    options: [] as any[],
    excludeFields: ["legacyId"] as string[],
    labels: [{ createdAt: "Fecha" }, { updatedAt: "Actualizado" }] as Record<
      string,
      string
    >[],
    columns: [] as any[],
    computedColumns: [] as any[],
    filters: {} as Record<string, any>,
    orderField: "id",
    orderType: "DESC" as "ASC" | "DESC",
    formSchema: [] as any[],
    formData: {} as Record<string, any>,
    formGroups: [] as any[],
  };
  if (entities.value[entity]?.pagination) {
    state.pagination = {
      itemsPerPage: 15,
      lastPage: null,
      totalCount: null,
      currentPage: 1,
      hasNextPage: null,
    };
  }
  return state;
};

const baseActions = {
  async collection(fetchPolicy = "cache-first") {
    if (this.columns.length === 0) {
      await this.getColumns();
    }
    // const { variablesTypes, variablesValues } = this.getCollectionVariables(
    //   this.collectionEndpoint,
    // );
    const fields = (this.computedColumns as Array<Column>).map((v) => {
      // !v.relatedTo ? v.field :
      if (v.relatedTo) {
        const t = {};
        const temp = useEntity(v.relatedTo);
        t[temp?.name] = ["id", "label"];
        return t;
      }
      return v.field;
    });
    const args = entities.value[this.name]?.queries.collection.args;
    const variables = Object.keys(this.filters).map((v) => {
      const temp = {};
      // if (v == "userRoles") v = "roles";
      console.log(args[v]);
      if (v in args) {
        temp[v] = args[v];
        temp[v].value = this.filters[v];
      } else {
        // alert(v);
      }

      return temp;
    });
    console.log(variables, 9999);
    const qb = queryBuilder.query({
      operation: this.collectionEndpoint,
      variables: entities.value[this.name]?.queries.collection.args,
      fields: fields,
    });
    const { data } = await getApolloClient().query({
      query: gql(qb.query),
      variables: qb.variables, //variablesValues,
      fetchPolicy,
    });
    if (typeof this.pagination !== "undefined") {
      this.items = data[this.collectionEndpoint].collection;
      const p = data[this.collectionEndpoint].paginationInfo;
      Object.assign(this.pagination, p);
    } else {
      this.items = data[this.collectionEndpoint];
    }
    nextTick(() => highlighted(this.computedColumns, this.filters));
    return data;
  },

  async getItem(id?: string | number) {
    const query = queryBuilder.query({
      operation: this.nameDecapitalize,
      variables: Api.getQueryVariables(this.nameDecapitalize),
      fields: this.getQueryFields(),
    });
    const { data } = await getApolloClient().query({
      query: gql(query.query),
      variables: { id: this.getIriFromId(id) },
      fetchPolicy: "cache-first",
    });
    this.item = data[this.nameDecapitalize];
  },

  async getFormSchema() {
    let formSchema: any[] = [];

    for (const field of this.fields) {
      if (this.excludeFields.includes(field.name)) continue;
      const fieldType = field.type;
      const isRequired = fieldType.kind === "NON_NULL";
      let fkType = "text";
      const attrs: any = {};
      if (fieldType.kind === "SCALAR") {
        if (fieldType.name === "String")
          fkType = field.name.includes("password") ? "password" : "text";
        if (fieldType.name === "Int" || fieldType.name === "ID")
          fkType = "number";
        if (fieldType.name === "Date") fkType = "datepicker";
      } else if (fieldType.kind === "ENUM") fkType = "select";
      else if (fieldType.kind === "OBJECT" || fieldType.kind === "LIST") {
        fkType = "select";
        attrs.options = `$${field.name}`;
        if (fieldType.kind === "LIST") attrs.multiple = true;
      }
      const label = this.labels.find((v: any) => field.name in v);
      if (this.classes?.[field.name])
        attrs["sections-schema"] = {
          inner: { attrs: { class: "max-w-200px " } },
        };
      formSchema.push({
        $formkit: fkType,
        name: field.name,
        label: label?.[field.name] ?? field.name,
        validation: isRequired ? "required" : "",
        ...attrs,
      });
    }
    if (this.formGroups.length) {
      // Lógica de grupos (mantenida compacta)
      let from = 0;
      for (const group of this.formGroups) {
        if (Array.isArray(group.children)) {
          group.children.forEach((child: any) => {
            if (child?.children && Number.isFinite(child.children)) {
              const to = child.children + from;
              child.children = formSchema.slice(from, to);
              from = to;
            }
          });
        }
      }
      return [
        {
          $el: "div",
          attrs: { class: "toast-error-form" },
          children: [{ $cmp: "FormKitMessages" }],
        },
        {
          $el: "div",
          attrs: { class: "form-header" },
          children: [
            {
              $el: "div",
              class: "font-medium u-text-1",
              children: "$slots.header",
            },
            { $el: "div", children: "$slots.crudBtn" },
          ],
        },
        {
          $el: "div",
          attrs: { class: "form-row" },
          children: this.formGroups.map((v: any) => ({
            $el: "div",
            attrs: { class: "form-col" },
            children: [v],
          })),
        },
      ];
    }
    this.formSchema = formSchema;
    this.formData = await this.getFormData();
    return formSchema;
  },

  async getFormData() {
    for (const field of this.fields) {
      if (this.excludeFields.includes(field.name)) continue;
      const fieldType = field.type;
      let storeName = "";
      if (fieldType.kind === "OBJECT" || fieldType.kind === "LIST") {
        storeName =
          fieldType.kind === "LIST"
            ? fieldType.ofType.name
            : fieldType.name.endsWith("PageConnection")
              ? fieldType.name.slice(0, -14)
              : fieldType.name;
        const store = await getStore(storeName);
        const { options } = storeToRefs(store);
        this.formData[field.name] = options;
      }
    }
    return this.formData;
  },

  async getColumns() {
    const { fetchConfig } = useEntityConfig();
    const entityConfig = await fetchConfig(this.name);
    this.columns = [];
    for (const v of entityConfig.collectionFieldConfig) {
      if (v.filterable) {
        v.schema = {
          $formkit: v.type === "text" ? "text_search" : v.type,
          name: v.field,
          id: v.id,
          loading: "$loading",
          outerClass: "mb-0!",
          dense: true,
        };
        if (v.type === "datetime") v.schema.range = true;
        else if (v.type === "multiple") {
          v.schema.$formkit = "select";
          v.schema.multiple = true;
        }
        if (v.schema.$formkit === "select") {
          const store = await getStore(v?.relatedTo);
          const { data } = await store.getOptions();
          v.schema.options = data.collectionAgnostic.data;
        }
      }
      this.columns.push(v);
    }
    this.setComputedColumns();
  },

  setComputedColumns() {
    this.computedColumns = this.columns.filter((v: any) => v.visible);
  },

  collectionFieldConfigs() {
    let temp: any;
    const fields = [
      "_id",
      ...this.fields
        .filter((v: any) => this.visibleColumns.includes(v.name))
        .map((v: any) => {
          temp = {};
          if (v.type.name?.endsWith("PageConnection")) {
            temp[v.name] = [{ collection: ["id", "label"] }];
            return temp;
          }
          if (
            v.type.kind === "LIST" ||
            v.type.kind === "OBJECT" ||
            (v.type.kind === "NON_NULL" && v.type.ofType?.kind === "OBJECT")
          ) {
            temp[v.name] = ["id", "label"];
            return temp;
          }
          return v.name;
        }),
    ];
    return typeof this.pagination !== "undefined"
      ? [{ paginationInfo: Object.keys(this.pagination), collection: fields }]
      : fields;
  },

  remove(arg?: any) {
    if (!arg) arg = this.item;
    Dialog.create({
      title: "Eliminar",
      message: getAlertText(
        "remove",
        arg?.nombre || arg?.label || arg.id || "este elemento.",
      ),
      cancel: true,
      persistent: true,
      html: true,
    }).onOk(() => {
      const operation = `delete${this.name}`;
      const fields: any = { [str.decapitalize(this.name)]: ["id"] };
      const query = queryBuilder.mutation({
        operation,
        variables: Api.getMutationVariables(operation),
        fields: [fields],
      });
      getApolloClient()
        .mutate({
          mutation: gql(query.query),
          variables: { input: { id: this.getIriFromId(arg) } },
        })
        .then(() => {
          bus.emit("positive", getAlertText("remove_after"));
          this.collection("network-only");
          if (router.currentRoute.value.name !== "list")
            router.push({ name: "list", params: { entity: this.name } });
        });
    });
  },

  removeMultiple(items: any) {
    Dialog.create({
      title: "Eliminar",
      message: getAlertText("remove", `${items.length} elementos`),
      cancel: true,
      persistent: true,
      html: true,
    }).onOk(() => {
      const query = queryBuilder.mutation({
        operation: "deleteAgnostic",
        variables: Api.getMutationVariables("deleteAgnostic"),
        fields: [{ agnostic: ["id"] }],
      });
      getApolloClient()
        .mutate({
          mutation: gql(query.query),
          variables: {
            input: {
              resource: this.name,
              ids: (Array.isArray(items) ? items : [items]).map(
                (i: any) => i._id,
              ),
            },
          },
        })
        .then(() => {
          bus.emit("positive", getAlertText("remove_after"));
          this.collection("network-only");
        });
    });
  },

  getCollectionVariables() {
    const value = {
      currentPage: this.pagination.currentPage,
      itemsPerPage: this.pagination.itemsPerPage,
      ...useCloned(this.filters).cloned.value,
    };
    if (this.orderField) value.order = [{ [this.orderField]: this.orderType }];
    const temp = this.computedColumns.filter(
      (v: any) => v.filterable && v.schema?.multiple,
    );
    temp.forEach((v: any) => {
      if (value[v.field] !== undefined) {
        value[`${v.field}_id_list`] = value[v.field].map((x: any) =>
          getIdFromIri(x.id),
        );
        delete value[v.field];
      }
    });
    // const v = Api.getQueryVariables(this.collectionEndpoint);
    for (let val in value) {
      if (val in v) {
        v[val].value = value[val];
      }
    }
    return {
      variablesTypes: v, //Api.getQueryVariables(this.collectionEndpoint),
      variablesValues: value,
    };
  },

  getOptions(entities?: Array<string>) {
    if (entities) {
      const queries = [];

      for (
        let index = 0, variables = {};
        index < entities.length;
        index++, variables = {}
      ) {
        const element = entities[index];
        variables[element] = {
          name: "resource",
          type: "String",
          value: element,
        };
        queries.push({
          operation: { name: "collectionAgnostic", alias: element },
          fields: ["data"],
          variables: variables, //Api.getQueryVariables("collectionAgnostic"),
        });
      }
      const q = queryBuilder.query(queries);
      return getApolloClient().query({
        query: gql(q.query),
        variables: q.variables,
      });
    } else if (this.options.length === 0) {
      const query = queryBuilder.query({
        operation: "collectionAgnostic",
        fields: ["data"],
        variables: { resource: { type: "String", value: this.name } },
      });
      return getApolloClient().query({
        query: gql(query.query),
        variables: query.variables,
      });
      // .then(({ data }) => (this.options = data["collectionAgnostic"].data));
    }
  },

  orderColumns(i: number, to: "left" | "right") {
    const temp = this.computedColumns[i];
    if (to === "left" && i !== 0) {
      this.computedColumns[i] = this.computedColumns[i - 1];
      this.computedColumns[i - 1] = temp;
    } else if (to !== "left" && i + 1 < this.columns.length) {
      this.computedColumns[i] = this.computedColumns[i + 1];
      this.computedColumns[i + 1] = temp;
    }
  },

  submit(data: any) {
    const query = queryBuilder.mutation({
      operation: this.mutationOperation,
      variables: Api.getMutationVariables(this.mutationOperation),
      fields: ["clientMutationId"],
    });
    return getApolloClient()
      .mutate({ mutation: gql(query.query), variables: { input: data } })
      .then(() => {
        bus.emit("positive", getAlertText());
        this.collection("network-only");
        if (router.currentRoute.value.name !== "list")
          router.push({ name: "list", params: { entity: this.name } });
      });
  },
};

const baseGetters = {
  name: (s: any) => s.name,
  entity: (s) => entities.value[s.name],
  nameDecapitalize: (s: any) => str.decapitalize(s.name),
  collectionEndpoint: (s: any) => `${str.decapitalize(s.name)}s`,
  quasarPagination: (s: any) => ({
    sortBy: s.orderField,
    descending: s.orderType === "DESC",
    page: s.pagination?.currentPage ?? 1,
    rowsPerPage: s.pagination?.itemsPerPage ?? 10,
    rowsNumber: s.pagination?.totalCount ?? 0,
  }),
  mutationOperation: (s: any) =>
    s.item.id ? `update${s.name}` : `create${s.name}`,
  visibleColumns: (s: any) =>
    s.columns.filter((v: any) => v.visible).map((v: any) => v.field),
  iri: (s: any) => `/api/${s.nameDecapitalize}s/${s.item.id}`,
  // getQueryFields: (s: any) =>
  //   entities.value[s.name].fields
  //     .filter((v: any) => !s.excludeFields.includes(v.name))
  //     .map((v: any) => {
  //       if (v.type.kind === "OBJECT") {
  //         const temp: any = {};
  //         if (v.type.name?.endsWith("PageConnection"))
  //           temp[v.name] = [{ collection: ["id", "label"] }];
  //         else temp[str.decapitalize(v.type.name)] = ["id", "label"];
  //         return temp;
  //       }
  //       if (v.type.kind === "LIST") {
  //         const temp: any = {};
  //         temp[v.name] = ["id", "label"];
  //         return temp;
  //       }
  //       return v.name;
  //     }),
};

/** Plugin simplificado */
export const entityPlugin = async (context: PiniaPluginContext) => {
  const { store } = context;
  // store.persist = {
  //   ...persist,
  // };
  if (!store.$id.endsWith("Entity")) return;
  const entityName = store.$id.replace(/Entity$/, "");
  // 1. Estado base (fusión compacta)
  const defaults = baseState(store.$id.replace(/Entity$/, ""));
  for (const k in defaults) {
    if (!(k in store.$state)) {
      const temp = ref(defaults[k]);
      store.$state[k] = temp;
      // patch[key] = defaults[key];
      store[k] = toRef(store.$state, k);
    }
  }
  // 2. Actions base
  for (const key in baseActions) {
    if (!store[key]) {
      store[key] = (...args) => {
        return baseActions[key].apply(store, args);
      };
    }
  }
  // 3. Getters base
  for (const key in baseGetters)
    if (!(key in store))
      Object.defineProperty(store, key, {
        get: () => (baseGetters as any)[key](store.$state),
        configurable: true,
        enumerable: true,
      });
};

/*
  Registro en main.ts:
  import { createPinia } from 'pinia'
  import { entityPlugin } from '@/plugins/piniaEntityPlugin'

  const pinia = createPinia()
  pinia.use(entityPlugin)
*/
