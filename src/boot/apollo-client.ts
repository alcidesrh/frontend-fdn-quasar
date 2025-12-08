import { boot } from "quasar/wrappers";
import { apolloClient } from "src/graphql/apolloClient";

export default boot(({ app }) => {
  // lo exponemos globalmente para poder usarlo
  app.config.globalProperties.$apollo = apolloClient;
});
