import { findType, unwrapType } from './typeResolver.js'

export function buildListQuery(typeName) {
  const plural = pluralize(typeName)

  return `
    query ${plural} {
      ${plural.toLowerCase()} {
        id
        ${buildFieldSelection(typeName)}
      }
    }
  `
}

export function buildCreateMutation(typeName) {
  return `
    mutation Create${typeName}($input: ${typeName}Input!) {
      create${typeName}(input: $input) {
        id
      }
    }
  `
}

export function buildUpdateMutation(typeName) {
  return `
    mutation Update${typeName}($id: ID!, $input: ${typeName}Input!) {
      update${typeName}(id: $id, input: $input) {
        id
      }
    }
  `
}

function buildFieldSelection(typeName) {
  const type = findType(typeName)

  return type.fields
    .filter(f => isScalarField(f))
    .map(f => f.name)
    .join('\n')
}

function isScalarField(field) {
  const resolved = unwrapType(field.type)
  return resolved.kind === 'SCALAR'
}

function pluralize(name) {
  return name.endsWith('s') ? name : name + 's'
}