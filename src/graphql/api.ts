import type { FetchPolicy, OperationVariables } from "@apollo/client/core";
import type { Collection } from "@/types/collection";
import * as gqlBuilder from "gql-query-builder";
import gql from "graphql-tag";
import type { EntityInterface } from "@/types/entity";
import { argsToArgsConfig } from "graphql/type/definition";
export const apollo = {
  prepareQueryArguments(args: []) {
    let temp = [],
      operation,
      variables,
      fields = ["data"];
    if (Array.isArray(args)) {
      if (args.length > 1) {
        operation = args[0];
        fields = Array.isArray(args[1]) ? args[1] : [args[1]];
      } else if (Array.isArray(args[0])) {
        args[0].forEach((i) => {
          temp.push(this.prepareQueryArguments(i));
        });
        return temp;
      } else if (typeof args[0] === "object") {
        ({ operation, fields } = args[0]);
      }
    } else if (typeof args === "object") {
      ({ operation, fields } = args);
    }
    if (!variables) {
      variables = getQueryArgs(operation);
    }
    return { operation: operation, fields: fields, variables: variables };
  },

  query(
    params:
      | (Record<"operation", string> &
          Record<"variables", TVariables> &
          Record<"fields", [any]>)
      | Record<"policy", FetchPolicy>
      | any,
  ) {
    if (Array.isArray(arguments[0]) && arguments[0].length == 0) {
      return;
    }
    // try {
    let query;
    const { operation, fields, variables, policy = "network-only" } = params;
    if (operation && fields) {
      query = gqlBuilder.query({
        operation: operation,
        fields: fields,
        variables: getQueryArgs(operation),
      });
    } else {
      query = gqlBuilder.query(this.prepareQueryArguments([arguments[0]]));
    }
    query = gql`
      ${query.query}
    `;

    // const { this.exec } = useNuxtApp();

    return getApolloClient().query({
      query,
      variables: variables || arguments[1] || [],
      fetchPolicy: policy,
    });
    // } catch (e) {
    //   alert("e");
    // }
  },

  collection(entity: Ref<EntityInterface>, fetchPolicy = "cache-first") {
    try {
      const queryBuild = gqlBuilder.query({
        operation: entity.value.endpoints.collection,
        fields: entity.value.prepareFieldForCollection(),
        variables: getQueryArgs(entity.value.endpoints.collection),
      });
      const query: any = gql`
        ${queryBuild.query}
      `;

      return getApolloClient().query({
        query,
        variables: entity.value.collection.args,
        fetchPolicy: fetchPolicy,
        context: { collection: true },
      });
    } catch (e) {
      cl(e);
    }
  },

  mutate(
    params: Record<"operation", string> &
      Record<"variables", VariablesParameter<OperationVariables | any>> &
      Record<"fields", any[]>,
  ) {
    let operation, variables, fields;
    if (params.operation) {
      ({ operation, variables, fields } = params);
    } else {
      operation = arguments[0];
      variables = arguments[1];
      fields = arguments[2];
    }
    const queryBuild = gqlBuilder.mutation({
      operation,
      variables: getMutationArgs(operation), //getMutationArgs(operation),
      fields: fields,
    });
    const query: any = gql`
      ${queryBuild.query}
    `;
    return getApolloClient().mutate({
      mutation: query,
      variables: { input: variables },
    });
  },
};

function getQueryArgs(query: string) {
  if (typeof fdn.value.queries[query] != "undefined") {
    return getArgs(fdn.value.queries[query]);
  }
}

function getMutationArgs(query: string) {
  if (typeof fdn.value.mutations[query] != "undefined") {
    return getArgs(fdn.value.mutations[query]);
  }
}
function getArgs(v: any) {
  const temp = {};
  v.args
    .filter((v) => !v.name.endsWith("_list"))
    .forEach((v) => {
      if (typeof v.type.ofType != "undefined") {
        if (v.type.kind == "LIST") {
          temp[v.name] = { type: `[${v.type.ofType.name}]` };
        } else if (v.type.kind == "NON_NULL") {
          temp[v.name] = { type: `${v.type.ofType.name}!` };
        }
      } else {
        temp[v.name] = { type: v.type.name };
      }
    });
  return temp;
}
