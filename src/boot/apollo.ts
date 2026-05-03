// src/boot/apollo.ts
import { defineBoot } from "#q-app/wrappers";
import { createAuthLink } from "@/graphql/links/authLink";
import { createErrorLink } from "@/graphql/links/errorLink";
import { createLoadingLink } from "@/graphql/links/loadingLink";
import { createMutationLink } from "@/graphql/links/mutationLink";
import { removeTypenameLink } from "@/graphql/links/removeTypenameLink";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { TabIdCoordinator } from "browser-tab-id";

const tabIdCoordinator = new TabIdCoordinator();
const tabId = tabIdCoordinator.tabId;

export { tabId };

export default defineBoot(async ({ app, pinia }) => {
  const httpLink = new HttpLink({
    uri: config.ENTRYPOINT_GRAPHQL,
  });
  const apolloClient = new ApolloClient({
    assumeImmutableResults: true,
    link: ApolloLink.from([
      // createQueryLink(),
      createMutationLink(),
      createAuthLink(tabId),
      createErrorLink(),
      createLoadingLink(pinia),
      removeTypenameLink,
      httpLink,
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        EntityConfiguration: {
          keyFields: ["entityClass"],
        },
      },
    }),
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: { fetchPolicy: "no-cache" },
      query: { fetchPolicy: "no-cache" },
      mutate: { errorPolicy: "all" },
    },
    // defaultOptions: {
    //   watchQuery: {
    //     notifyOnNetworkStatusChange: false,
    //     fetchPolicy: "cache-and-network",
    //   },
    // },
  });
  setApolloClient(apolloClient);
});
