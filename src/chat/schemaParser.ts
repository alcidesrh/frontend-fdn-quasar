import { useSchemaStore } from "@/stores/schemaStore2";

export function getEntities() {
  const schemaStore = useSchemaStore();
  if (!schemaStore.schema) return [];

  const queryType = schemaStore.schema.types.find(
    (t) => t.name === schemaStore.schema.queryType.name,
  );
  return queryType.fields
    .filter((f) => {
      if (f.type.name) {
        return f.type.name.endsWith("Connection");
      }
      return false;
    }) // Colecciones como OfferConnection
    .map((f) =>
      f.name.replace(/s$/, "").replace(/^\w/, (c) => c.toUpperCase()),
    ); // De 'offers' a 'Offer'
}

export function getEntityFields(entityName) {
  const schemaStore = useSchemaStore();
  const entityType = schemaStore.schema.types.find(
    (t) => t.name === entityName,
  );
  return entityType?.fields.filter((f) => !f.name.startsWith("_")) || []; // Excluir meta-campos
}

export function getFilterConfig(entityName) {
  const schemaStore = useSchemaStore();
  const queryType = schemaStore.schema.types.find(
    (t) => t.name === schemaStore.schema.queryType.name,
  );
  const collectionName = `${entityName.toLowerCase()}s`;
  const collectionField = queryType.fields.find(
    (f) => f.name === collectionName,
  );
  const filters = {};

  if (collectionField) {
    collectionField.args.forEach((arg) => {
      if (arg.name === "order") {
        // OrderFilter: campos del input type
        const orderInput = schemaStore.schema.types.find(
          (t) => t.name === arg.type.ofType?.name || arg.type.name,
        );
        filters.order =
          orderInput.inputFields?.map((field) => ({
            field: field.name,
            type: "OrderEnum", // ASC/DESC
          })) || [];
      } else if (arg.type.kind === "INPUT_OBJECT") {
        // DateFilter, BooleanFilter, etc.
        const inputType = schemaStore.schema.types.find(
          (t) => t.name === arg.type.name,
        );
        if (inputType.name.includes("DateFilter")) {
          filters.date = inputType.inputFields.map((f) => ({
            field: f.name,
            type: "DateRange",
          }));
        } else if (inputType.name.includes("BooleanFilter")) {
          filters.boolean = inputType.inputFields.map((f) => ({
            field: f.name,
            type: "Boolean",
          }));
        }
      } else {
        // SearchFilter: args directos como 'property: String'
        filters.search = filters.search || [];
        filters.search.push({ field: arg.name, type: arg.type.name });
      }
    });
  } else {
    // cl(entityName);
  }

  return filters;
}

export function getFormSchema(entityName, mode = "create") {
  const schemaStore = useSchemaStore();
  const mutationType = schemaStore.schema.types.find(
    (t) => t.name === schemaStore.schema.mutationType.name,
  );
  const mutationName = `${mode}${entityName}`;
  const mutationField = mutationType.fields.find(
    (f) => f.name === mutationName,
  );
  if (!mutationField) {
    return entityName;
  }
  const inputArg = mutationField.args.find((a) => a.name === "input");
  const inputTypeName = inputArg.type.ofType.name;
  const inputType = schemaStore.schema.types.find(
    (t) => t.name === inputTypeName,
  );

  if (inputType.name == "createUserInput") {
    // cl(inputType);
    return inputType.inputFields.map((field) => ({
      $formkit: getFormKitType(field),
      name: field.name,
      label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
      validation: field.type.kind === "NON_NULL" ? "required" : "",
    }));
  }
  return inputArg;
  // Generar esquema FormKit desde inputFields
}

function getFormKitType(graphqlType) {
  cl(graphqlType);
  switch (graphqlType) {
    case "String":
      return "text";
    case "Int":
      return "number";
    case "Boolean":
      return "checkbox";
    case "DateTime":
      return "date";
    default:
      return "text";
  }
}
