import { unwrapType, resolveEnum } from './typeResolver.js'

export function buildFormSchema(type) {
  const fields = type.fields.filter(f => !isInternal(f.name))

  return [
    {
      $el: 'div',
      attrs: {
        class: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
      },
      children: fields.map(mapFieldToFormKit)
    }
  ]
}

function mapFieldToFormKit(field) {
  const resolved = unwrapType(field.type)
  const required = field.type.kind === 'NON_NULL'

  let config = {
    $formkit: 'text',
    name: field.name,
    label: humanize(field.name),
    validation: required ? 'required' : undefined
  }

  switch (resolved.kind) {
    case 'SCALAR':
      config.$formkit = scalarToInput(resolved.name)
      break

    case 'ENUM':
      config.$formkit = 'select'
      config.options = resolveEnum(resolved.name)
      break

    case 'OBJECT':
      config.$formkit = 'select'
      config.options = []
      config.attrs = { 'data-relation': resolved.name }
      break

    case 'LIST':
      config.$formkit = 'select'
      config.multiple = true
      break
  }

  return config
}

function scalarToInput(name) {
  const map = {
    String: 'text',
    Int: 'number',
    Float: 'number',
    Boolean: 'checkbox',
    Date: 'date',
    ID: 'text'
  }
  return map[name] || 'text'
}

function humanize(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
}

function isInternal(name) {
  return ['_id', '__typename', 'validTokenStrings'].includes(name)
}