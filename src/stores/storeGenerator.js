// src/utils/storeGenerator.js
import { defineStore } from "pinia";
import gql from "graphql-tag";
import * as queryBuilder from "gql-query-builder";
import * as gqlBuilder from "gql-query-builder";

export function generateStoresFromSchema(piniaInstance) {
  const schemaStore = useSchemaStore();

  schemaStore.schema.forEach((type) => {
    if (
      !type.name.endsWith("Connection") &&
      !type.name.endsWith("Edge") &&
      !type.name.endsWith("PageInfo") &&
      !type.name.endsWith("Resource") &&
      !type.name.endsWith("Payload") &&
      !type.name.endsWith("PaginationInfo")
    ) {
      const storeId = `${type.name.toLowerCase()}Store`;
      // Evitar re-registrar la misma store
      if (piniaInstance._s.has(storeId)) {
        return;
      }
      // cl(storeId);
      const useStore = defineStore(storeId, {
        persist: {
          ...persist,
          afterHydrate: (ctx) => {
            // cl("Hydrate: " + storeId, ctx);
            // if (ctx.store.items.length == 0) {
            // ctx.store.getItems();
            // }
          },
        }, // pinia-plugin-persistedstate
        state: () => ({
          name: type.name,
          items: [],
          fields: type.fields,
          pagination: { currentPage: 1, itemsPerPage: 10, total: 0 },
          filters: {},
          visibleColumns: [],
          columns: [],
        }),

        actions: {
          async collection() {
            await this.getColumns();
            const qb = queryBuilder.query({
              operation: `${type.name.toLowerCase()}s`, // convención API Platform / Hydra
              // variables: {
              //   page: this.pagination.currentPage,
              //   itemsPerPage: this.pagination.itemsPerPage,
              //   ...this.filters,
              // },
              fields: typeFields(type),
            });

            const { data } = await getApolloClient().query({
              query: gql(qb.query),
            });
            // Estructura típica de API Platform GraphQL (Hydra)
            this.items = data[`${type.name.toLowerCase()}s`];

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
                label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
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
              let query = gqlBuilder.query({
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
              this.visibleColumns = data.map((v) => v.field);
              // .then(({ data, networkStatus }) => {
              //   if (typeof data == "undefined" && networkStatus == 1) {
              //     return;
              //   }

              // setColumns(data.columnsMetadataResource.data);

              // if (entity.value.collection.visibleColumns.length == 0) {
              //   entity.value.collection.visibleColumns =
              //     entity.value.collection.columns.map((v) => v.field);
              //   entity.value.collection.computedColumns =
              //     entity.value.collection.columns;
              // }

              // resolve(true);
              // });
            }

            return this.columns;
          },

          // Aquí puedes añadir create, update, delete con mutaciones...
        },
        getters: {
          computedColumns: (s) => {
            return s.columns;
          },
        },
      });

      // Registrar la store dinámicamente
      useStore(piniaInstance);
    }
  });
}
