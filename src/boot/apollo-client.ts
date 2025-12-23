import { defineBoot } from "#q-app/wrappers";
import { apolloClient } from "src/graphql/apolloClient";

export default defineBoot(({ app }) => {
  // lo exponemos globalmente para poder usarlo
  app.config.globalProperties.$apollo = apolloClient;
});
