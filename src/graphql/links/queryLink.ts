import { ApolloLink } from "@apollo/client/core";
export function createQueryLink() {
  return new ApolloLink((operation, forward) => {
    if (
      operation.operationType == "query" &&
      operation?.variables.id
      // Object.keys(operation.variables).includes("id")
    ) {
      const temp = operation.query.definitions[0].selectionSet.selections;
      const temp2 = temp.filter(
        (i) => i.arguments.filter((i) => i.name.value == "id").length,
        // && i.selectionSet.selections.filter((i) => i.name.value == "collection").length == 0,
      );
      if (temp2.length) {
        operation.variables.id = `/api/${temp2[0].name.value}s/${operation.variables.id}`;
      }
    }
    return forward(operation);
  });
}
