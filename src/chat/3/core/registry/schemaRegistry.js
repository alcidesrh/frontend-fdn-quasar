
import { createCrudStore } from '../stores/crudFactory'

export const registry = new Map()

export function buildRegistryFromSchema(schema) {
  const types = schema.__schema.types.filter(
    t => t.kind === 'OBJECT' && !t.name.startsWith('__')
  )

  types.forEach(type => {
    const store = createCrudStore(type)
    registry.set(type.name, {
      type,
      store
    })
  })
}
