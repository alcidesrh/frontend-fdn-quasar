
import { boot } from 'quasar/wrappers'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

export let apollo

export default boot(() => {
  apollo = new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
  })
})
