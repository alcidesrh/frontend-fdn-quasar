import type { FieldType } from '../Field.js'
import inflection from 'inflection'

function getType(openApiType: string, format?: string): FieldType {
  if (format) {
    switch (format) {
      case 'int32':
      case 'int64':
        return 'integer'
      default:
        return inflection.camelize(format.replace('-', '_'), true)
    }
  }

  return openApiType
}

export default getType
