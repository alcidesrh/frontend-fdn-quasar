
import { boot } from 'quasar/wrappers'
import { apollo } from './apollo'
import { buildRegistryFromSchema } from '../core/registry/schemaRegistry'

export default boot(async () => {
  const INTROSPECTION_QUERY = {
    query: `
      query IntrospectionQuery {
        __schema {
          types {
            kind
            name
            fields {
              name
              type {
                kind
                name
                ofType { kind name }
              }
            }
          }
        }
      }
    `
  }

  const { data } = await apollo.query(INTROSPECTION_QUERY)
  buildRegistryFromSchema(data)
})
