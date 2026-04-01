import { EntityModel, EntityStore, Field } from "@/types/graphql";
import Api from "@/stores/models/Api";

export default class User extends Api {
  formExclude = [
    "roles",
    "password",
    "plainPassword",
    "fullName",
    "validTokenStrings",
    "userIdentifier",
  ];
  labels = [{ userRoles: "Roles" }, { username: "Usuario" }];
  classes = {
    nit: "max-w-200px",
  };
  formGroups = [
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
  ];
  constructor(name) {
    super(name);
    this.formExclude = [...this.getFormExclude(), ...this.formExclude];
    this.label = [...this.baseLabel, ...this.labels];
  }
  // getFormData() {
  //   const store = useStoreByName("Role");
  //   store.getOptions();
  //   const { options } = storeToRefs(store);

  //   const localidadStore = useStoreByName("Localidad");
  //   localidadStore.getOptions();
  //   const { options: localidadOptions } = storeToRefs(localidadStore);

  //   const permisoStore = useStoreByName("Permiso");
  //   permisoStore.getOptions();
  //   const { options: permisoOptions } = storeToRefs(permisoStore);

  //   return ref({
  //     userRoles: options,
  //     localidad: localidadOptions,
  //     permisos: permisoOptions,
  //     // item: computed(() => entity.value.item),
  //     // submit: (data) => store.submit(data),
  //   });
  // }
}
// export default {
//   ...base,
//   formExclude: [
//     ...base.formExclude,
//     "roles",
//     "password",
//     "plainPassword",
//     "fullName",
//     "validTokenStrings",
//     "userIdentifier",
//   ],
//   formOrder: [
//     "username",
//     "nombre",
//     "apellido",
//     "email",
//     "telefono",
//     "direccion",
//     "localidad",
//     "nit",
//   ],
//   classes: {
//     nit: "max-w-200px",
//   },
//   formGroups: [
//     {
//       $el: "fieldset",
//       children: [
//         { $el: "legend", children: "Información personal" },
//         { $el: "span", children: 8 },
//       ],
//     },
//     {
//       $el: "fieldset",
//       children: [
//         { $el: "legend", children: "Roles & Privilegios" },
//         { $el: "span", children: 4 },
//       ],
//     },
//   ],
//   formData: () => {
//     const roleStore = userRoleStore();
//     roleStore.getItems();
//     const { options: roles } = storeToRefs(roleStore);

//     return {
//       // localidades: items,
//       roles,
//       // permisos,
//       // item: computed(() => entity.value.item),
//       // submit: (data) => store.submit(data),
//     };
//   },
// } as EntityModel;
