// src/utils/routeGenerator.js
export function generateRoutesFromSchema() {
  const routes = [];

  const schemaStore = useSchemaStore();

  schemaStore.schema.forEach((type) => {
    if (
      !type.name.endsWith("Connection") &&
      !type.name.endsWith("Edge") &&
      !type.name.endsWith("PageInfo") &&
      !type.name.endsWith("Resource") &&
      !type.name.endsWith("Payload") &&
      !type.name.endsWith("PaginationInfo")
    ) {
      routes.push({
        name: type.name,
        path: `/${type.name.toLowerCase()}s`,
        component: () => import("pages/CRUDPage.vue"),
        meta: { entity: type.name },
      });
    }
  });

  return routes;
}
