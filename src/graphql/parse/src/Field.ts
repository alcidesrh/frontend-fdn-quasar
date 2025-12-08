import type { Resource } from './graphql/Resource.js'
import type { Nullable } from './types.js'
import { assignSealed } from './utils/assignSealed.js'

export type FieldType
  = | 'string'
    | 'integer'
    | 'negativeInteger'
    | 'nonNegativeInteger'
    | 'positiveInteger'
    | 'nonPositiveInteger'
    | 'number'
    | 'decimal'
    | 'double'
    | 'float'
    | 'boolean'
    | 'date'
    | 'dateTime'
    | 'duration'
    | 'time'
    | 'byte'
    | 'binary'
    | 'hexBinary'
    | 'base64Binary'
    | 'array'
    | 'object'
    | 'email'
    | 'url'
    | 'uuid'
    | 'password'
    | Record<'kind', any>

export interface FieldOptions
  extends Nullable<{
    id?: string
    kind?: string
    type?: FieldType
    arrayType?: FieldType
    enum?: { [key: string | number]: string | number }
    reference?: string | Resource
    embedded?: Resource
    required?: boolean
    nullable?: boolean
    description?: string
    maxCardinality?: number
    deprecated?: boolean
  }> {}

export interface Field extends FieldOptions {}
export class Field {
  constructor(public name: string, options: FieldOptions = {}) {
    assignSealed(this, options)
  }
}
