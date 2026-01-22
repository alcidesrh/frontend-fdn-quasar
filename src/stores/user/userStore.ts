import type { User } from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const {
      getItems,
      schema,

      remove,
      removeMultiple,
      resource,
      entity,
      iniCollection,
      sortCollection,
      getCollection,
      setFormkitSchema,
    } = createStore<User>("User");

    entity.value.endpoints.get = "getByUsernameUser";

    entity.value.excludeFormFields = [
      "password",
      "password_confirm",
      "userIdentifier",
      "validTokenStrings",
      "legacyId",
      "fullName",
      "roles",
    ];
    function submit(data) {
      // const { onDone, loading } =

      return apollo
        .mutate({
          operation: entity.value.getMutationOperation(),
          variables: Entity.prepareVariables(data),
          fields: entity.value.getMutationFields(),
        })
        .then(({ data }) => {
          entity.value.item = data[entity.value.getMutationOperation()].user;
          msg.emit(getAlertText("update"));
        })
        .catch((e) => {
          e.errors.forEach(({ message, locations, path, extensions }) => {
            let temp = {};
            if (extensions && extensions.debugMessage) {
              temp = {
                summary: message,
                detail: extensions.debugMessage,
              };
            } else {
              temp = {
                summary: "GraphQL error from plugin/apollo.ts",
                detail:
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
          // merror({ message: e, life: false });
        });
    }

    return {
      getItems,
      schema,
      submit,
      resource,
      remove,
      removeMultiple,

      entity,
      iniCollection,
      sortCollection,
      getCollection,
      setFormkitSchema,
    };
  },
  {
    persist: {
      afterHydrate: (ctx) => {
        console.log(`just hydrated '${ctx.store.$id}'`);
      },
      beforeHydrate: (ctx) => {
        console.log(`about to hydrate '${ctx.store.$id}'`);
      },
      // omit: ['collection']
      pick: [
        "entity.collection.columns",
        "entity.collection.orderField",
        "entity.collection.orderType",
        "entity.collection.pagination",
        "entity.collection.visibleColumns",
        "entity.fields",
        "entity.collection.filters",
      ],
    },
  },
);
