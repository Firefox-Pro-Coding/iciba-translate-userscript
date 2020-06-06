import {
  TypeOf,
  string,
  array,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const sameAnalysis = excess(type({
  part_name: string,
  word_list: string,
  means: array(string),
}), 'sameAnalysis')
export type SameAnalysis = TypeOf<typeof sameAnalysis>
