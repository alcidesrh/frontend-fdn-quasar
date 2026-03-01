import { unwrapType } from './typeResolver.js'

export function buildTableColumns(type) {
  return type.fields
    .filter(isDisplayable)
    .map(f => ({
      name: f.name,
      label: humanize(f.name),
      field: f.name,
      sortable: true,
      align: 'left'
    }))
}

function isDisplayable(field) {
  const resolved = unwrapType(field.type)
  return resolved.kind === 'SCALAR' || resolved.kind === 'ENUM'
}

function humanize(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
}