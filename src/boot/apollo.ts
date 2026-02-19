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
export default defineBoot(async ({ app, pinia }) => {
  const httpLink = new HttpLink({
    uri: ENTRYPOINT_GRAPHQL,
  });

  const apolloClient = new ApolloClient({
    assumeImmutableResults: true,
    link: ApolloLink.from([
      createQueryLink(),
      createMutationLink(),
      createAuthLink(),
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
  const store = useLoadingStore(pinia);

  // await initUltraRegistry();

  // cl(registry);
  // await useSchemaStore().fetchSchema();
  // alert(2);
  // getEntities().forEach((v) => cl(getEntityFields(v)));
  // cl(getFormSchema("User"));
  // watch(
  //   () => ({ loading: store.loading, p: store.highestPriority }),
  //   ({ loading, p }) => {
  //     // ejemplo de política:
  //     // p>=3: barra + overlay (lo decides en layout)
  //     // p=2: barra
  //     // p=1: nada (o spinner local)
  //     if (loading && p >= 2) LoadingBar.start();
  //     else LoadingBar.stop();
  //   },
  //   { deep: true },
  // );
});
