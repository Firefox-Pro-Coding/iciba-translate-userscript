import * as t from 'io-ts'
import { createEnumType } from '~/src/util/extendIoTs'

type createEnumTypeFunction = typeof createEnumType

declare module 'io-ts' {
  export const enumType: createEnumTypeFunction
}
