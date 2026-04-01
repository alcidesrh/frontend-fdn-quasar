import gql from "graphql-tag";
import * as queryBuilder from "gql-query-builder";

export default class Api {
  name = "";
  nameDecapitalize = "";
  baseExclude = ["legacyId"];
  baseFormExclude = ["id", "_id", "label", "createdAt", "updatedAt"];
  baseLabel = [{ createdAt: "Fecha" }, { updatedAt: "Actualizado" }];
  formGroups = [];
  formData = {};

  constructor(name: string) {
    this.name = name;
    this.nameDecapitalize = str.decapitalize(name);

    if (typeof this.formExclude == "undefined") {
      this.formExclude = this.baseFormExclude;
    }
    if (typeof this.label == "undefined") {
      this.label = this.baseLabel;
    }
  }

  getFormExclude = () => [...this.baseExclude, ...this.baseFormExclude];
  // getFormData = () => this.formData;

  getIriFromId(mixed?: string | Record<"id", string>): string {
    return (
      mixed?.id || `/api/${this.nameDecapitalize}s/${mixed || this.item._id}`
    );
  }
  async getForm(fields: Field[]) {
    let formSchema = [];
    for (const field of fields) {
      if (this.formExclude.includes(field.name)) {
        continue;
      }

      let fieldType = field.type;
      // while (fieldType.ofType) fieldType = fieldType.ofType;

      const isRequired = field.type.kind === "NON_NULL";
      let fkType = "text"; // Default
      let attrs = {};

      // Mapeo similar al JS anterior
      if (fieldType.kind === "SCALAR") {
        if (fieldType.name === "String")
          fkType = field.name.includes("password") ? "password" : "text";
        if (fieldType.name === "Int" || fieldType.name === "ID")
          fkType = "number";
        if (fieldType.name === "Date") fkType = "datepicker";
      } else if (fieldType.kind === "ENUM") {
        fkType = "select";
      } else if (fieldType.kind === "OBJECT" || fieldType.kind === "LIST") {
        fkType = "select";
        attrs.options = `$${field.name}`;
        if (fieldType.kind === "LIST") {
          attrs.multiple = true;
        }
      }
      const name = this.label.find((v) => Object.keys(v)[0] == field.name);
      if (this.classes && this.classes[field.name]) {
        attrs["sections-schema"] = {
          inner: { attrs: { class: "max-w-200px " } },
        };
      }
      formSchema.push({
        $formkit: fkType,
        name: field.name,
        label: name ? name[field.name] : field.name,
        validation: isRequired ? "required" : "",
        ...attrs,
      });
    }
    if (this.formGroups.length) {
      let from = 0;
      for (const group of this.formGroups) {
        if (Array.isArray(group.children)) {
          group.children.forEach((child) => {
            if (child?.children) {
              if (Number.isFinite(child?.children)) {
                const to = child.children + from;
                child.children = formSchema.slice(from, to);
                from = to;
              }
            }
          });
        }
      }
      const temp = {
        $el: "div",
        attrs: { class: "form-row" },
        children: [],
      };
      this.formGroups.forEach((v) => {
        temp.children.push({
          $el: "div",
          attrs: { class: "form-col" },
          children: [v],
        });
      });

      return [
        {
          $el: "div",
          attrs: {
            class: "toast-error-form",
          },
          children: [{ $cmp: "FormKitMessages" }],
          //   [
          //     'div' => [
          //         'class' => 'toast-error-form',
          //         'children' => [
          //             'component' => 'FormKitMessages'
          //         ]
          //     ]
          // ]
        },
        {
          $el: "div",
          attrs: {
            class: "form-header",
          },
          children: [
            {
              $el: "div",
              class: "font-medium u-text-1",
              children: "$slots.header",
            },
            {
              $el: "div",
              children: "$slots.crudBtn",
            },
          ],
        },
        temp,
      ];
    }

    return formSchema;
  }
  async getFormData(fields: Field[]) {
    let storeName = "";
    for (const field of fields) {
      if (this.formExclude.includes(field.name)) {
        continue;
      }
      let fieldType = field.type;
      if (fieldType.kind === "OBJECT" || fieldType.kind === "LIST") {
        if (fieldType.kind === "LIST") {
          storeName = fieldType.ofType.name;
        } else {
          if (fieldType.name.endsWith("PageConnection")) {
            storeName = fieldType.name.substring(0, fieldType.name.length - 14);
          } else {
            storeName = fieldType.name;
          }
        }
        const store = await useStoreByName(storeName);
        store.getOptions();
        const { options } = storeToRefs(store);
        this.formData[field.name] = options;
      }
    }
    return this.formData;
  }
  getOptions(force = false) {
    let query = queryBuilder.query({
      operation: "collectionAgnostic",
      fields: ["data"],
      variables: Api.getQueryVariables("collectionAgnostic"),
    });
    let name = this.name;
    return getApolloClient().query({
      query: gql(query.query),
      variables: { resource: name },
    });
  }
  // getQueryVariables(operation = null) {
  //   const temp = {};
  //   queries.value[operation || `${this.nameDecapitalize}`].args.forEach((v) => {
  //     if (v.type.ofType) {
  //       if (v.type.kind == "LIST") {
  //         temp[v.name] = { type: `[${v.type.ofType.name}]` };
  //       } else if (v.type.kind == "NON_NULL") {
  //         temp[v.name] = { type: `${v.type.ofType.name}!` };
  //       }
  //     } else {
  //       temp[v.name] = { type: v.type.name };
  //     }
  //   });

  //   return temp;
  // }
  static getQueryVariables(operation) {
    const temp = {};
    queries.value[operation].args.forEach((v) => {
      if (v.type.ofType) {
        if (v.type.kind == "LIST") {
          temp[v.name] = { type: `[${v.type.ofType.name}]` };
        } else if (v.type.kind == "NON_NULL") {
          temp[v.name] = { type: `${v.type.ofType.name}!` };
        }
      } else {
        temp[v.name] = { type: v.type.name };
      }
    });

    return temp;
  }
  static getMutationVariables(operation) {
    const temp = {};
    mutations.value[operation].args.forEach((v) => {
      if (v.type.ofType) {
        if (v.type.kind == "NON_NULL") {
          temp[v.name] = { type: v.type.ofType.name + "!" };
        } else {
          temp[v.name] = { type: v.type.ofType.name };
        }
      }
    });
    return temp;
  }
  getQueryFields(excludes = []) {
    return entities.value[this.name].fields
      .filter((v) => !excludes.includes(v.name))
      .map((v) => {
        if (v.type.kind == "OBJECT") {
          const temp = {};
          if (v.type.name && v.type.name.endsWith("PageConnection")) {
            // cl(v);
            // temp[
            //   str.decapitalize(
            //     v.type.name.substring(0, v.type.name.length - 14),
            //   )
            // ] = ["id", "label"];
            temp[v.name] = [{ collection: ["id", "label"] }];
          } else {
            temp[str.decapitalize(v.type.name)] = ["id", "label"];
          }
          return temp;
        } else if (v.type.kind == "LIST") {
          const temp = {};
          temp[v.name] = ["id", "label"];
          return temp;
        }

        // cl(v);
        return v.name;
      });
  }
}
