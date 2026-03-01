
export function generateFormKitSchema(fields) {
  return fields.map(field => ({
    $formkit: 'text',
    name: field.name,
    label: field.name,
    outerClass: 'col-12 col-md-6'
  }))
}
