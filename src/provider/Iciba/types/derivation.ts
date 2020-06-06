import {
  TypeOf,
  string,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const derivation = excess(type({
  yuyuan_name: string,
}), 'derivation')
export type Derivation = TypeOf<typeof derivation>
