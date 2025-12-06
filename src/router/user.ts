import type { BreadcrumbValue } from "types/breadcrumb";

const list: BreadcrumbValue = {
  label: "UserList",
  icon: "whatshot",
};
const create: BreadcrumbValue = {
  label: "UserCreate",
  icon: "whatshot",
};
const update: BreadcrumbValue = {
  label: "UserUpdate",
  icon: "whatshot",
};
const show: BreadcrumbValue = {
  label: "UserShow",
  icon: "whatshot",
};

export default [
  {
    name: list.label,
    path: "/users/",
    component: () => import("pages/user/PageList.vue"),
    meta: {
      breadcrumb: [list],
    },
  },
  {
    name: create.label,
    path: "/users/create",
    component: () => import("pages/user/PageCreate.vue"),
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, create],
    },
  },
  {
    name: update.label,
    path: "/users/edit/:id",
    component: () => import("pages/user/PageUpdate.vue"),
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, update],
    },
  },
  {
    name: show.label,
    path: "/users/show/:id",
    component: () => import("pages/user/PageShow.vue"),
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, show],
    },
  },
];
