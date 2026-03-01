// src/boot/apollo.ts
import { defineBoot } from "#q-app/wrappers";
import { useLoadingStore } from "src/stores/loading";
import { watch } from "vue";
import { LoadingBar } from "quasar";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { createAuthLink } from "@/graphql/links/authLink";
import { createErrorLink } from "@/graphql/links/errorLink";
import { createLoadingLink } from "@/graphql/links/loadingLink";
import { createMutationLink } from "@/graphql/links/mutationLink";
import { createQueryLink } from "@/graphql/links/queryLink";
import { TabIdCoordinator } from "browser-tab-id";

const tabIdCoordinator = new TabIdCoordinator();
const tabId = tabIdCoordinator.tabId;

export { tabId };

export default defineBoot(async ({ app, pinia }) => {
  const httpLink = new HttpLink({
    uri: ENTRYPOINT_GRAPHQL,
  });
  const apolloClient = new ApolloClient({
    assumeImmutableResults: true,
    link: ApolloLink.from([
      createQueryLink(),
      createMutationLink(),
      createAuthLink(tabId),
      createErrorLink(),
      createLoadingLink(pinia),
      httpLink,
    ]),
    cache: new InMemoryCache(),
    queryDeduplication: false,

    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: false,
        fetchPolicy: "cache-and-network",
      },
    },
  });
  setApolloClient(apolloClient);
});
