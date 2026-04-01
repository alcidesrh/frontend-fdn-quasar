import { inject } from "vue";
import { gql } from "@apollo/client/core";

export interface CollectionFieldConfig {
  id: string;
  field: string;
  position: number;
  visible: boolean;
  sortable?: boolean;
  filterable?: boolean;
  label: string;
  attrs: null;
  type: Type;
  name: string;
  relatedTo: null | string;
  __typename: Typename;
  groupName?: null;
}

export interface FormField {
  id: string;
  field: string;
  position: number;
  visible: boolean;
  groupName: null;
  attrs: null;
  label: string;
  type: string;
  name: string;
  relatedTo: string;
  __typename: string;
}

export interface EntityConfig {
  id: number;
  entityClass: string;
  collectionFieldConfig: CollectionFieldConfig[];
  formFields: FormField[];
}

const GET_ALL_CONFIGS = gql`
  query GetAllConfigs {
    entityConfigurations {
      id
      entityClass
    }
  }
`;

const GET_CONFIG = gql`
  query GetConfig($entityClass: String!) {
    entityConfigurations(entityClass: $entityClass) {
      entityClass
      collectionFieldConfig {
        id
        field
        position
        visible
        sortable
        filterable
        label
        attrs
        type
        name
        relatedTo
      }
      formFields {
        id
        field
        position
        visible
        groupName
        attrs
        label
        type
        name
        relatedTo
      }
    }
  }
`;

const GET_CONFIG_ADMIN = gql`
  query GetConfig($entityClass: String!) {
    entityConfigurations(entityClass: $entityClass) {
      entityClass
      collectionFieldConfig {
        id
        field
        position
        visible
        sortable
        filterable
        label
        attrs
        type
        name
      }
      formFields {
        id
        field
        position
        visible
        groupName
        attrs
        label
        type
        name
      }
    }
  }
`;

const UPDATE_CONFIG = gql`
  mutation UpdateConfig($input: updateWithRelationsEntityConfigurationInput!) {
    updateWithRelationsEntityConfiguration(input: $input) {
      entityConfiguration {
        id
        entityClass
      }
    }
  }
`;

export const useEntityConfig = () => {
  const fetchAllConfigs = async (): Promise<any[]> => {
    const { data } = await getApolloClient().query({ query: GET_ALL_CONFIGS });
    return data.entityConfigurations;
  };

  const fetchConfig = async (entityClass: string): Promise<EntityConfig> => {
    const { data } = await getApolloClient().query({
      query: GET_CONFIG,
      variables: { entityClass },
    });
    return data.entityConfigurations[0];
  };

  const fetchConfigAdmin = async (
    entityClass: string,
  ): Promise<EntityConfig> => {
    const { data } = await getApolloClient().query({
      query: GET_CONFIG_ADMIN,
      variables: { entityClass },
    });
    return data.entityConfigurations[0];
  };

  const saveConfig = async (input) => {
    return await getApolloClient().mutate({
      mutation: UPDATE_CONFIG,
      variables: { input },
      context: {
        keepId: true,
      },
    });
  };

  return { fetchAllConfigs, fetchConfig, saveConfig, fetchConfigAdmin };
};
