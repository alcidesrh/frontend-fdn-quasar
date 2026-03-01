
export function extractObjectTypes(schema) {
  return schema.__schema.types.filter(
    t => t.kind === 'OBJECT' && !t.name.startsWith('__')
  )
}
