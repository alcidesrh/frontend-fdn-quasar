import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ServerError,
} from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  ServerParseError,
} from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { map } from "rxjs";
import { visit, Kind, BREAK } from "graphql";

const httpLink = new HttpLink({
  uri: ENTRYPOINT_GRAPHQL,
});
const mutationRelationIriLink = new ApolloLink((operation, forward) => {
  if (operation.operationType == "mutation") {
    const variables = operation.variables.input;
    const f = Object.keys(variables);
    Object.keys(variables).forEach((k) => {
      if (util.isObject(variables[k]) && !!variables[k]?.id) {
        operation.variables.input[k] = variables[k].id;
      } else if (util.isArray(variables[k])) {
        variables[k].forEach((v, i) => {
          if (util.isObject(v) && !!v?.id) {
            operation.variables.input[k][i] = v.id;
          }
        });
      }
    });
  }
  return forward(operation);
});
const queryRelationIriLink = new ApolloLink((operation, forward) => {
  if (
    operation.operationType == "query" &&
    Object.keys(operation.variables).includes("id")
  ) {
    cl(operation, Object.keys(operation.variables).includes("id"));
    const temp = operation.query.definitions[0].selectionSet.selections;
    const temp2 = temp.filter(
      (i) =>
        i.arguments.filter((i) => i.name.value == "id").length &&
        i.selectionSet.selections.filter((i) => i.name.value == "collection")
          .length == 0,
    );
    if (temp2.length) {
      operation.variables.id = `/api/${temp2[0].name.value}s/${operation.variables.id}`;
    }
  }
  return forward(operation);
});
const globalLoadingLink = new ApolloLink((operation, forward) => {
  // const temp = operation.variables.common
  gloading.value++;
  if (operation.operationType == "query") {
    if (operation.variables?.page) {
      cloading.value++;
    } else {
      qloading.value++;
    }
  } else if (operation.operationType == "mutation") {
    mloading.value++;
  }
  return forward(operation).pipe(
    map((result) => {
      gloading.value--;
      if (operation.operationType == "query") {
        if (operation.variables?.page) {
          cloading.value--;
        } else {
          qloading.value--;
        }
      } else if (operation.operationType == "mutation") {
        mloading.value--;
      }
      return result;
    }),
  );
});
const authLink = new ApolloLink((operation, forward) => {
  const store = useUserSessionStore();
  operation.setContext({
    headers: {
      Authorization: `fdn_459d648b686311423af49288c6a5f7a372c6085875efcb5efa3e00474ad912a6`,
      // Authorization: `Bearer ${store.user.token}`,
    },
  });
  return forward(operation);
});
const errorLink = new ErrorLink(({ error, operation }) => {
  gloading.value = cloading.value = qloading.value = false;
  if (ServerError.is(error)) {
    if (error.statusCode == 401) {
      useUserSessionStore().clear();
      const router = useRouter();
      router.push({ name: "Login" });
    } else if (error.statusCode == 500) {
      const { status, title, detail } = JSON.parse(error.bodyText);
      merror({
        summary: `Status code: ${status}. GraphQL ServerError from plugin/apollo.ts: ${title}`,
        detail: detail,
        // message: `GraphQL error from plugin/apollo.ts: ${message}, Location: ${locations}, Path: ${path}`,
      });
    } else {
      error.errors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
  } else if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path, extensions }) => {
      let temp = {};
      if (extensions && extensions.debugMessage) {
        temp = {
          caption: message,
          message: extensions.debugMessage,
        };
      } else {
        temp = {
          caption: "GraphQL error from plugin/apollo.ts",
          message:
            message +
            " " +
            (extensions && extensions.debugMessage
              ? extensions.debugMessage
              : ""),
          // message: `GraphQL error from plugin/apollo.ts: ${message}, Location: ${locations}, Path: ${path}`,
        };
      }
      merror(temp);
    });
  } else if (ServerParseError.is(error)) {
    merror({
      summary: `Failed to parse response from ${error.response.url}`,
      detail: `${error.bodyText} Status code: ${error.statusCode}`,
    });
    // Access the original parse error
    console.log(`Parse error: ${error.cause}`);
  } else {
    alert("error in useApollo");

    console.error(`[Network error]: ${error}`);
  }
});
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    globalLoadingLink,
    queryRelationIriLink,
    mutationRelationIriLink,
    authLink,
    errorLink,
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
