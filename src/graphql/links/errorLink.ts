import { ErrorLink } from "@apollo/client/link/error";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/core";
import {
  ServerError,
  CombinedGraphQLErrors,
  ServerParseError,
} from "@apollo/client";
export function createErrorLink() {
  return new ErrorLink(({ error, networkError, operation, forward }) => {
    const store = useLoadingStore();
    const { loading } = storeToRefs(store);

    let temp;

    if (ServerError.is(error)) {
      if (error.statusCode == 401) {
        useUserSessionStore().clear();
        const router = useRouter();
        temp = {
          message: "Acceso no permitido.",
        };
        router.push({ name: "Login" });
      } else if (error.statusCode == 500) {
        const { status, title, detail } = JSON.parse(error.bodyText);
        temp = {
          caption: `Status code: ${status}. GraphQL ServerError from plugin/apollo.ts: ${title}`,
          message: detail,
        };
      } else if (error.statusCode == 404) {
        temp = {
          message: `No GraphQL Endpoint`,
          caption: "Status code: 404. ",
        };
      } else {
        error.errors.forEach(({ message, locations, path }) =>
          merror({
            message: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          }),
        );
        return;
      }
    } else if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path, extensions }) => {
        if (extensions && extensions.debugMessage) {
          temp = {
            caption: message,
            message:
              extensions.debugMessage +
              " " +
              extensions?.file +
              " " +
              extensions.line,
          };
        } else {
          temp = {
            caption:
              "GraphQL error from /home/alcides/frontend-fdn-quasar/src/graphql/apollo-client.ts",
            message:
              message +
              " " +
              (extensions && extensions.debugMessage
                ? extensions.debugMessage
                : ""),
          };
        }
      });
    } else if (ServerParseError.is(error)) {
      // Access the original parse error
      temp = {
        caption: `Failed to parse response from ${error.response.url}`,
        message: `${error.bodyText} Status code: ${error.statusCode}`,
      };
    } else {
      temp = {
        caption:
          "GraphQL error from /home/alcides/frontend-fdn-quasar/src/graphql/apollo-client.ts",
        message: "Problema con la conexión.",
      }; //loading.value.value = c//loading.value.value = q//loading.value.value = 0;
    }
    // decrease();
    merror(temp);
    // console.error(`[Error]: ${error}`);

    // return forward(operation).finally(() => {
    //   loading.value.m--;
    //   loading.value.g--;
    // });
  });
}
