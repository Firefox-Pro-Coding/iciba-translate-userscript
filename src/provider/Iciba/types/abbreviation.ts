import {
  TypeOf,
  string,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const abbreviation = excess(type({
  mean_cn: string,
  mean_en: string,
}), 'abbreviation')
export type Abbreviation = TypeOf<typeof abbreviation>
