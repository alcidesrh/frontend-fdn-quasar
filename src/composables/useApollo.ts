import { ref } from "vue";
import { apolloClient } from "/src/graphql/apolloClient";

export function useApollo() {
  const loading = ref(false);
  const error = ref(null);

  const query = async (options) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await apolloClient.query(options);
      return result.data;
    } catch (err: any) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const mutate = async (options) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await apolloClient.mutate(options);
      return result.data;
    } catch (err: any) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    query,
    mutate,
    loading,
    error,
  };
}
