import {
  TypeOf,
  string,
  array,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const wordPartStemsAffix = excess(type({
  value_en: string,
  value_cn: string,
  word_buile: string,
}), 'tradeMean')
export type WordPartStemsAffix = TypeOf<typeof wordPartStemsAffix>


export const wordPart = excess(type({
  word_part: string,
  stems_affixes: array(wordPartStemsAffix),
}), 'wordPart')
export type WordPart = TypeOf<typeof wordPart>


/** 词根词缀 */
export const stemsAffix = excess(type({
  type: string, // 类型（词根|词缀）
  type_value: string, // 词根词缀 的 部分
  type_exp: string, // 词根解释
  word_parts: array(wordPart), // 解释 item
}), 'StemsAffix')
export type StemsAffix = TypeOf<typeof stemsAffix>
