import {
  TypeOf,
  string,
  intersection,
  array,
  partial,
  type,
  union,
  nullType,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const collinExample = excess(intersection([
  type({
    ex: string, // 原句
    tran: string, // 翻译
  }),
  partial({
    tts_mp3: string, // url
    tts_size: union([string, nullType]), // xxK
  }),
]), 'collinExample')
export type Example = TypeOf<typeof collinExample>


export const collinEntry = excess(type({
  posp: string,
  tran: string, // translation 翻译
  def: string, // definition 解释
  example: array(collinExample),
}), 'collinEntry')
export type CollinEntry = TypeOf<typeof collinEntry>


/** 柯林斯高阶英汉双解学习词典 */
export const collin = excess(intersection([
  type({
    entry: array(collinEntry),
  }),
  partial({
    item: string,
    tran: string,
    phvb: array(excess(type({
      phrase: string,
    }))),
    usage_note: excess(type({
      note: string,
      translation: string,
    })),
  }),
]), 'collin')
export type Collin = TypeOf<typeof collin>
