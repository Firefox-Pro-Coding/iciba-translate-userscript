import * as t from 'io-ts'
import { createEnumType } from '~/util/extendIoTs'

type createEnumTypeFunction = typeof createEnumType

declare module 'io-ts' {
  export const enumType: createEnumTypeFunction
}
