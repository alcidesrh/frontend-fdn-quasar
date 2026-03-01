import { defineStore } from "pinia";
import { gql } from "@apollo/client/core";
import { useSchemaStore } from "./schemaStore2";

export const createEntityStore = (entityName) => {
  const schemaStore = useSchemaStore();
  const collectionQueryName = `${entityName.toLowerCase()}s`; // Asumiendo convención 'offers' para 'Offer'
  const singleQueryName = entityName.toLowerCase();
  const createMutationName = `create${entityName}`;
  const updateMutationName = `update${entityName}`;
  const deleteMutationName = `delete${entityName}`;

  return defineStore(`entity-${entityName}`, {
    state: () => ({
      items: [],
      item: null,
      loading: false,
      totalCount: 0,
    }),
    getters: {
      fields: () => {
        // Obtener campos de la entidad desde esquema
        const entityType = schemaStore.schema.types.find(
          (t) => t.name === entityName,
        );
        return entityType?.fields.map((f) => f.name) || [];
      },
      filters: () => {
        // Obtener args de filtro desde query de colección
        const queryType = schemaStore.schema.types.find(
          (t) => t.name === schemaStore.schema.queryType.name,
        );
        const collectionField = queryType.fields.find(
          (f) => f.name === collectionQueryName,
        );
        return (
          collectionField?.args.filter(
            (a) => !["first", "after", "last", "before"].includes(a.name),
          ) || []
        );
      },
    },
    actions: {
      async fetchList(
        filters = {},
        order = [],
        pagination = { first: 10, after: null },
      ) {
        this.loading = true;
        const filterArgs = Object.entries(filters)
          .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
          .join(", ");
        const orderStr = order
          .map((o) => `{ ${o.field}: "${o.direction}" }`)
          .join(", ");
        const query = gql`
          query {
            ${collectionQueryName}(${filterArgs ? filterArgs + ", " : ""}order: [${orderStr}], first: ${pagination.first}, after: "${pagination.after || ""}") {
              totalCount
              edges {
                node {
                  id
                  ... on ${entityName} { ${this.fields.join(" ")} }
                }
              }
              pageInfo { endCursor hasNextPage }
            }
          }
        `;
        try {
          const { data } = await getApolloClient().query({ query });
          this.items = data[collectionQueryName].edges.map((e) => e.node);
          this.totalCount = data[collectionQueryName].totalCount;
        } finally {
          this.loading = false;
        }
      },
      async fetchOne(id) {
        const query = gql`
          query {
            ${singleQueryName}(id: "${id}") {
              id
              ${this.fields.join(" ")}
            }
          }
        `;
        const { data } = await getApolloClient().query({ query });
        this.item = data[singleQueryName];
      },
      async create(input) {
        const mutation = gql`
          mutation {
            ${createMutationName}(input: ${JSON.stringify(input)}) {
              ${entityName.toLowerCase()} { id ${this.fields.join(" ")} }
            }
          }
        `;
        await getApolloClient().mutate({ mutation });
      },
      // Acciones similares para update y delete
    },
  });
};
