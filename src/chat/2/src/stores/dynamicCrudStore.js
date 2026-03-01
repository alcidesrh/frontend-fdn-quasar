
import { defineStore } from 'pinia'
import queryBuilder from 'gql-query-builder'

export function createCrudStore(entityName, apollo) {
  return defineStore(entityName, {
    state: () => ({
      items: [],
      loading: false
    }),
    actions: {
      async fetchAll() {
        this.loading = true
        const query = queryBuilder.query({
          operation: entityName,
          fields: ['id', 'name']
        })
        const result = await apollo.query({ query: query.query })
        this.items = result.data[entityName]
        this.loading = false
      }
    },
    persist: true
  })
}
