import {
  TypeOf,
  string,
  array,
  type,
  number,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const cetSentence = excess(type({
  sentence: string, // 例句
  come: string, // 来源
}), 'cetSentence')
export type CetSentence = TypeOf<typeof cetSentence>


export const kd = excess(type({
  ZH: string,
  EN: string,
}), 'kd')
export type Kd = TypeOf<typeof kd>


export const cet = excess(type({
  word: string, // 词语
  count: number, // 出现次数
  kd: array(kd),
  Sentence: array(cetSentence), // 例句
}), 'cet')
export type Cet = TypeOf<typeof cet>
