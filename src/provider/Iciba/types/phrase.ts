import {
  TypeOf,
  string,
  array,
  type,
  intersection,
  partial,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const lj = excess(type({
  lj_ly: string,
  lj_ls: string,
}), 'lj')
export type Lj = TypeOf<typeof lj>


/** 解析 */
export const jx = excess(intersection([
  type({
    jx_cn_mean: string,
    jx_en_mean: string,
  }),
  partial({
    lj: array(lj),
  }),
]), 'jx')
export type Jx = TypeOf<typeof jx>


/** 词组 */
export const phrase = excess(type({
  cizu_name: string,
  jx: array(jx),
}), 'phrase')
export type Phrase = TypeOf<typeof phrase>
