
import { boot } from 'quasar/wrappers'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

export default boot(({ app }) => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
  })

  app.config.globalProperties.$apollo = apolloClient
})
