
import { defineStore } from 'pinia'
import queryBuilder from 'gql-query-builder'
import { apollo } from '../../boot/apollo'

export function createCrudStore(type) {
  return defineStore(type.name, {
    state: () => ({
      items: [],
      total: 0,
      page: 1,
      loading: false,
      filters: {}
    }),

    actions: {
      async fetch() {
        this.loading = true

        const query = queryBuilder.query({
          operation: type.name,
          variables: {
            page: { value: this.page, required: true }
          },
          fields: type.fields.map(f => f.name)
        })

        const { data } = await apollo.query({ query: query.query })
        const result = data[type.name]

        this.items = result['hydra:member'] || result
        this.total = result['hydra:totalItems'] || 0
        this.loading = false
      }
    },

    persist: true
  })
}
