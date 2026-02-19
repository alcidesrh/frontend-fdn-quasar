import { defineStore } from "pinia";
import { gql } from "@apollo/client/core";

const INTROSPECTION_QUERY = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      types {
        kind
        name
        description
        fields {
          name
          args {
            name
            type {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
          type {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
        inputFields {
          name
          type {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
        enumValues {
          name
        }
      }
    }
  }
`;

export const useSchemaStore = defineStore("schema", {
  state: () => ({
    schema: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchSchema() {
      this.loading = true;
      try {
        const { data } = await getApolloClient().query({
          query: INTROSPECTION_QUERY,
        });
        this.schema = data.__schema;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
