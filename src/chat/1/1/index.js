import { buildFormSchema } from './formBuilder.js'
import { buildTableColumns } from './tableBuilder.js'
import { buildListQuery, buildCreateMutation, buildUpdateMutation } from './queryBuilder.js'
import { setSchema, findType } from './typeResolver.js'

export function buildCrudModule(introspection, typeName) {
  setSchema(introspection.__schema)

  const type = findType(typeName)

  return {
    formSchema: buildFormSchema(type),
    tableColumns: buildTableColumns(type),
    listQuery: buildListQuery(typeName),
    createMutation: buildCreateMutation(typeName),
    updateMutation: buildUpdateMutation(typeName)
  }
}
