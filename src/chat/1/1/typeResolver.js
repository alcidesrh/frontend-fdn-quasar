let schemaGlobal = null

export function setSchema(schema) {
  schemaGlobal = schema
}

export function findType(name) {
  return schemaGlobal.types.find(t => t.name === name)
}

export function unwrapType(type) {
  let current = type
  while (current.ofType) current = current.ofType
  return current
}

export function resolveEnum(enumName) {
  const enumType = findType(enumName)
  if (!enumType?.enumValues) return []

  return enumType.enumValues.map(v => ({
    label: humanize(v.name),
    value: v.name
  }))
}

function humanize(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
}