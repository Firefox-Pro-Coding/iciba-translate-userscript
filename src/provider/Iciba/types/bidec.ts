import {
  TypeOf,
  string,
  array,
  type,
  intersection,
  union,
  partial,
  any,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const bidecSentence = excess(type({
  en: string,
  cn: string,
}), 'bidecSentence')
export type BidecSentence = TypeOf<typeof bidecSentence>


export const bidecPartMean = excess(type({
  word_mean: string,
  part_id: string,
  mean_id: string,
  sentences: array(bidecSentence),
}), 'bidecPartMean')
export type BidecPartMean = TypeOf<typeof bidecPartMean>


export const bidecPart = excess(type({
  part_name: string,
  word_id: string,
  part_id: string,
  means: array(bidecPartMean),
}), 'bidecPart')
export type BidecPart = TypeOf<typeof bidecPart>


// 未知词典
export const bidec = excess(intersection([
  type({
    word_name: string,
  }),
  partial({
    word_smv: union([string, array(string)]),
    parts: array(bidecPart),
    symbols: array(any),
  }),
]), 'bidec')
export type Bidec = TypeOf<typeof bidec>
