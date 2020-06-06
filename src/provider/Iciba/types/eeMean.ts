import {
  TypeOf,
  string,
  array,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const eeMeanSentence = excess(type({
  sentence: string,
}), 'eeMeanSentence')
export type EeMeanSentence = TypeOf<typeof eeMeanSentence>


export const eeMeanDetail = excess(type({
  word_mean: string, // 解释
  sentences: array(eeMeanSentence), // 例句
}), 'eeMeanDetail')
export type EeMeanMean = TypeOf<typeof eeMeanDetail>


/** 英英词典 */
export const eeMean = excess(type({
  part_name: string, // 词性
  means: array(eeMeanDetail),
}), 'eeMean')
export type EeMean = TypeOf<typeof eeMean>
