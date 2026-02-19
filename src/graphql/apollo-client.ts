// src/apollo/client.ts
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";

let _client: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient() {
  if (!_client) {
    throw new Error(
      "Apollo Client no está inicializado. " +
        'Asegúrate de que el boot "apollo" se ejecute antes de usarlo.',
    );
  }
  return _client;
}

// Solo para uso interno (el boot lo llama)
export function setApolloClient(client: ApolloClient<NormalizedCacheObject>) {
  _client = client;
}
