import type { Field } from '../Field.js'
import type { Operation } from '../Operation.js'
import type { Parameter } from '../Parameter.js'
import type { Nullable } from '../types.js'
import { assignSealed } from '../utils/assignSealed.js'

export interface ResourceOptions
  extends Nullable<{
    id?: string
    title?: string
    description?: string
    deprecated?: boolean
    fields?: Field[]
    readableFields?: Field[]
    writableFields?: Field[]
    parameters?: Parameter[]
    getParameters?: () => Promise<Parameter[]>
    operations?: Operation[]
  }> {}

export class Query {
  constructor(
    public name: string,
    public args: {
      name: string
      type: {
        name: any
        kind: 'SCALAR' | 'ENUM' | 'LIST' | 'NON_NULL' | 'INPUT_OBJECT'
      }
    }[],
    public type: {},
    options: any = {},
  ) {
    assignSealed(this, options)
  }
}
