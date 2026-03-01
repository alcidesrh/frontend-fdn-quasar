/**
 * Convierte un GraphQL introspection type en FormKit Schema
 * @param {Object} typeDef - __type del introspection
 * @returns {Array} FormKit Schema JSON
 */
export function graphqlTypeToFormKitSchema(typeDef) {
  if (!typeDef?.fields) return [];
  const excludedFields = [
    "_id",
    "validTokenStrings",
    "userIdentifier",
    "password",
  ];

  const fields = typeDef.fields.filter((f) => !excludedFields.includes(f.name));

  const basicFields = [];
  const relationFields = [];
  const systemFields = [];

  for (const field of fields) {
    const config = mapFieldToFormKit(field);

    if (!config) continue;

    // Clasificación simple
    if (isRelation(field)) {
      relationFields.push(config);
    } else if (isSystemField(field.name)) {
      systemFields.push(config);
    } else {
      basicFields.push(config);
    }
  }

  return [
    sectionWrapper("Información General", basicFields),
    sectionWrapper("Relaciones", relationFields),
    sectionWrapper("Sistema", systemFields),
  ];
}

function mapFieldToFormKit(field) {
  const { type, name } = field;
  const resolved = unwrapType(type);

  const required = type.kind === "NON_NULL";

  let formType = "text";
  let extra = {};

  switch (resolved.kind) {
    case "SCALAR":
      formType = scalarToInput(resolved.name);
      break;

    case "ENUM":
      formType = "select";
      extra.options = []; // Debe completarse desde introspection enumValues
      break;

    case "OBJECT":
      formType = "select";
      extra.options = []; // async data
      break;

    case "LIST":
      formType = "select";
      extra.multiple = true;
      break;

    default:
      return null;
  }

  return {
    $formkit: formType,
    name,
    label: name,
    validation: required ? "required" : undefined,
    outerClass: "col-span-1",
    ...extra,
  };
}

function unwrapType(type) {
  let current = type;
  while (current.ofType) {
    current = current.ofType;
  }
  return current;
}

function scalarToInput(name) {
  switch (name) {
    case "String":
      return "text";
    case "Int":
      return "number";
    case "Float":
      return "number";
    case "Boolean":
      return "checkbox";
    case "Date":
      return "date";
    case "ID":
      return "text";
    default:
      return "text";
  }
}

function isRelation(field) {
  const unwrapped = unwrapType(field.type);
  return unwrapped.kind === "OBJECT";
}

function isSystemField(name) {
  return ["createdAt", "updatedAt", "status", "legacyId"].includes(name);
}

function sectionWrapper(title, children) {
  if (!children.length) return null;

  return {
    $el: "div",
    attrs: {
      class: "bg-white shadow rounded-2xl p-6 space-y-6",
    },
    children: [
      {
        $el: "h2",
        attrs: {
          class: "text-xl font-semibold border-b pb-2",
        },
        children: title,
      },
      {
        $el: "div",
        attrs: {
          class: `
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          `,
        },
        children,
      },
    ],
  };
}

//-----------------------Grock--------------
/**
 * Función para parsear un esquema GraphQL de introspección y generar un esquema JSON-serializable
 * para FormKitSchema en Vue.js. El esquema generado utiliza un diseño responsive con Tailwind CSS,
 * estructurando los campos en una cuadrícula que se adapta a diferentes dimensiones de dispositivos:
 * - 1 columna en pantallas pequeñas (móviles),
 * - 2 columnas en pantallas medianas (tablets),
 * - 3 columnas en pantallas grandes (desktops).
 *
 * Se omiten campos con argumentos (e.g., conexiones paginadas) ya que típicamente no son editables en formularios simples.
 * Se mapean tipos GraphQL a inputs FormKit adecuados, considerando nulabilidad para validaciones requeridas.
 * Para tipos complejos como ENUM, OBJECT o LIST, se usan placeholders para opciones (deben cargarse dinámicamente en la aplicación).
 *
 * @param {Object} graphqlSchema - El JSON del esquema GraphQL de introspección (e.g., { data: { __type: { fields: [...] } } }).
 * @returns {Array} - El esquema FormKit como array de objetos JSON-serializable.
 */
export function generateFormKitSchema(graphqlSchema) {
  const fields = graphqlSchema.fields || [];
  const formSchema = [];

  // Estructura principal: Contenedor responsive con grid de Tailwind
  const gridContainer = {
    $el: "div",
    attrs: {
      class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4",
    },
    children: [],
  };

  // Función auxiliar para capitalizar etiquetas (e.g., 'fullName' -> 'Full Name')
  function capitalize(str) {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  fields.forEach((field) => {
    // Omitir campos con argumentos (e.g., conexiones paginadas o filtradas)
    if (field.args && field.args.length > 0) return;

    let fieldType = field.type;
    while (fieldType.ofType) {
      fieldType = fieldType.ofType;
    }

    const isRequired = field.type.kind === "NON_NULL";
    let fkType = null;
    let additionalAttrs = {};

    switch (fieldType.kind) {
      case "SCALAR":
        switch (fieldType.name) {
          case "String":
            if (field.name.toLowerCase().includes("password")) {
              fkType = "password";
            } else if (field.name.toLowerCase().includes("email")) {
              fkType = "email";
            } else if (
              field.name.toLowerCase().includes("telefono") ||
              field.name.toLowerCase().includes("phone")
            ) {
              fkType = "tel";
            } else if (
              field.name.toLowerCase().includes("direccion") ||
              field.name.toLowerCase().includes("address")
            ) {
              fkType = "textarea";
            } else {
              fkType = "text";
            }
            break;
          case "Int":
          case "ID":
            fkType = "number";
            if (
              fieldType.name === "ID" ||
              field.name === "id" ||
              field.name === "_id"
            ) {
              additionalAttrs.disabled = true; // IDs suelen ser read-only
            }
            break;
          case "Date":
            fkType = "date";
            break;
          default:
            fkType = "text"; // Fallback
        }
        break;
      case "ENUM":
        fkType = "select";
        additionalAttrs.options = []; // Placeholder: Cargar dinámicamente (e.g., desde API)
        break;
      case "OBJECT":
        fkType = "select";
        additionalAttrs.options = []; // Placeholder: Cargar dinámicamente (e.g., query GraphQL para opciones)
        break;
      case "LIST":
        fkType = "select";
        additionalAttrs.multiple = true;
        additionalAttrs.options = []; // Placeholder: Cargar dinámicamente
        break;
      default:
        return; // Omitir tipos no mapeables
    }

    if (fkType) {
      const inputSchema = {
        $formkit: fkType,
        name: field.name,
        label: capitalize(field.name),
        validation: isRequired ? "required" : "",
        ...additionalAttrs,
      };

      gridContainer.children.push(inputSchema);
    }
  });

  // Agregar el contenedor grid al esquema principal
  formSchema.push(gridContainer);

  // Agregar botón de envío (fuera del grid para full-width)
  formSchema.push({
    $el: "button",
    attrs: {
      type: "submit",
      class:
        "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4",
    },
    children: "Enviar",
  });

  return formSchema;
}

// Ejemplo de uso:
// const graphqlSchema = { /* JSON del esquema proporcionado */ };
// const miSchemaArray = generateFormKitSchema(graphqlSchema);
// En Vue: <FormKit type="form" @submit="handleSubmit" :actions="false"><FormKitSchema :schema="miSchemaArray" /></FormKit>
