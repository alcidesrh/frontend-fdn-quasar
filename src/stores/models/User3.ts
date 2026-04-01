import { EntityModel, EntityStore, Field } from "@/types/graphql";
import Base from "@/stores/models/Base";

export default function (name) {
  const baseStore = new Base(name);
  const baseState = baseStore.state();
  const state = {
    ...baseState,
    excludeFields: [
      ...baseState.excludeFields,
      "roles",
      "password",
      "plainPassword",
      "fullName",
      "validTokenStrings",
      "userIdentifier",
    ],
    labels: [
      ...baseState.labels,
      { userRoles: "Roles" },
      { username: "Usuario" },
    ],
    formGroups: [
      {
        $el: "fieldset",
        children: [
          { $el: "legend", children: "Información personal" },
          { $el: "span", children: 8 },
        ],
      },
      {
        $el: "fieldset",
        children: [
          { $el: "legend", children: "Roles & Privilegios" },
          { $el: "span", children: 4 },
        ],
      },
    ],
  };
  return {
    state: (): EntityStore => state,
    actions: {
      ...baseStore.actions,
    },
    getters: {
      ...baseStore.getters,
    },
  };
}
