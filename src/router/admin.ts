import { RouterLink } from "vue-router";

export default [
  {
    path: "admin",
    name: "admin",
    children: [
      {
        path: "entities",
        name: "admin_entity",
        // component: () => import("src/pages/admin/EntityConfigs.vue"),
        children: [
          {
            name: "entity_list",
            path: ":lista?",
            component: () => import("@/pages/admin/EntityList.vue"),
          },

          {
            name: "entity_config",
            path: ":action/:entity",
            component: () => import("@/pages/admin/EntityConfig.vue"),
          },
        ],
      },
    ],
  },
];
