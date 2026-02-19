import { ApolloLink } from "@apollo/client/core";
export function createMutationLink() {
  return new ApolloLink((operation, forward) => {
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
}
