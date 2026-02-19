import { useSchemaStore } from "src/stores/schemaStore";

export function getEntities() {
  const schemaStore = useSchemaStore();
  if (!schemaStore.schema) return [];

  const queryType = schemaStore.schema.types.find(
    (t) => t.name === schemaStore.schema.queryType.name,
  );
  return queryType.fields
    .filter((f) => f.type.name.endsWith("Connection")) // Colecciones como OfferConnection
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
  const inputArg = mutationField.args.find((a) => a.name === "input");
  const inputTypeName = inputArg.type.name;
  const inputType = schemaStore.schema.types.find(
    (t) => t.name === inputTypeName,
  );

  // Generar esquema FormKit desde inputFields
  return inputType.inputFields.map((field) => ({
    $formkit: getFormKitType(field.type.name),
    name: field.name,
    label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
    validation: field.type.kind === "NON_NULL" ? "required" : "",
  }));
}

function getFormKitType(graphqlType) {
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
