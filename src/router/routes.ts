import type { RouteRecordRaw } from "vue-router";
import adminRoutes from "./admin";
import userRoutes from "./user";
import roleRoutes from "./role";
import testRoutes from "./test";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      breadcrumb: { label: "Inicio", icon: "home" },
    },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/lista/:entity",
        name: "list",
        component: () =>
          import("@/components/crud/collection/DynamicCollection.vue"),
        meta: { lista: true },
      },
      {
        path: "/form/:entity/:id?",
        name: "form",
        component: () => import("@/components/crud/form/DynamicForm.vue"),
        meta: { form: true },
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/pages/Test.vue"),
      },

      ...userRoutes,
      ...roleRoutes,
      ...testRoutes,
      ...adminRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
