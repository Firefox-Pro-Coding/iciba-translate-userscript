import {
  TypeOf,
  string,
  array,
  type,
  number,
  unknown,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'


export const gaokaoSentence = excess(type({
  sentence: string,
  come: string,
}), 'gaokaoSentence')
export type GaokaoSentence = TypeOf<typeof gaokaoSentence>


export const gaokao = excess(type({
  word: string,
  count: number,
  kd: array(unknown),
  Sentence: array(gaokaoSentence),
}), 'gaokao')
export type Gaokao = TypeOf<typeof gaokao>
