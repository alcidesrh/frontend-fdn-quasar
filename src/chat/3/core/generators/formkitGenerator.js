
export function generateFormSchema(type) {
  const grid = {
    $el: 'div',
    attrs: { class: 'row q-col-gutter-md' },
    children: []
  }

  type.fields.forEach(field => {
    grid.children.push({
      $el: 'div',
      attrs: { class: 'col-12 col-sm-6 col-md-4' },
      children: [{
        $formkit: mapScalar(field),
        name: field.name,
        label: field.name
      }]
    })
  })

  return [grid]
}

function mapScalar(field) {
  const t = field.type.name || field.type.ofType?.name

  if (t === 'Int') return 'number'
  if (t === 'Boolean') return 'checkbox'
  if (t === 'Float') return 'number'
  if (t === 'ID') return 'text'

  return 'text'
}
