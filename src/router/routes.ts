import type { RouteRecordRaw } from "vue-router";
import userRoutes from "./user";
import roleRoutes from "./role";
import testRoutes from "./test";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      ...userRoutes,
      ...roleRoutes,
      ...testRoutes,
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
