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
    path: "/usuarios",
    // name: 'User',
    meta: { label: "usuarios", icon: "icon-park-outline:every-user" },

    children: [
      {
        name: "user_collection",
        path: "",
        component: () => import("@/pages/user/UserCollection.vue"),
        meta: {
          label: "List",
          type: "user",
          action: "list",
          route: "users",
        },
      },
      {
        name: "createUser",
        path: "crear",
        component: () => import("@/pages/user/UserForm.vue"),
        meta: {
          label: "Crear usuario",
          icon: "icon-park-outline:edit",
          type: "user",
          action: "create",
          route: "createUser",
        },
      },
      {
        name: "updateUser",
        path: "edit/:id",
        component: () => import("@/pages/user/UserForm.vue"),
        meta: {
          label: "Editar usuario",
          icon: "icon-park-outline:edit",
          type: "user",
          action: "edit",
          route: "updateUser",
        },
      },
      {
        name: "account_edit",
        path: "cuenta/:id",
        component: () => import("@/pages/user/UserAccount.vue"),
        meta: {
          label: "Mi cuenta",
          icon: "icon-park-outline:edit",
          type: "user",
          action: "edit",
          route: "account_edit",
        },
      },
    ],
  },
];
