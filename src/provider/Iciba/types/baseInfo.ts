import {
  TypeOf,
  string,
  array,
  type,
  intersection,
  union,
  partial,
  number,
  literal,
  any,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const symbolPart = excess(type({
  part: string,
  means: array(string),
}), 'symbolPart')
export type SymbolPart = TypeOf<typeof symbolPart>


export const symbolCN = excess(intersection([
  type({
    word_symbol: string,
    symbol_mp3: string,
    parts: array(symbolPart),
  }),
  partial({
    word_id: string,
    symbol_id: string,
  }),
]), 'symbolCN')
export type SymbolCN = TypeOf<typeof symbolCN>


export const symbolEN = excess(intersection([
  type({
    parts: array(symbolPart),
  }),
  partial({
    ph_am: string,
    ph_am_mp3: string,
    ph_am_mp3_bk: string,
    ph_en: string,
    ph_en_mp3: string,
    ph_en_mp3_bk: string,
    ph_other: string,
    ph_tts_mp3: string,
    ph_tts_mp3_bk: string,
  }),
]), 'symbolEN')
export type SymbolEN = TypeOf<typeof symbolEN>


export const symbol = union([
  symbolEN,
  symbolCN,
])
export type Symbol = TypeOf<typeof symbol>


export const exchange = excess(partial({
  word_pl: array(string),
  word_third: array(string),
  word_past: array(string),
  word_done: array(string),
  word_ing: array(string),
  word_er: array(string),
  word_est: array(string),
  word_prep: array(string),
  word_adv: array(string),
  word_verb: array(string),
  word_noun: array(string),
  word_adj: array(string),
  word_conn: array(string),
}), 'symbolCN')
export type Exchange = TypeOf<typeof exchange>


export const fromSymbolsMeanWord = excess(intersection([
  type({
    word_name: string,
    is_CRI: union([number, string]),
    symbols: array(symbolEN),
  }),
  partial({
  }),
]), 'fromSymbolsMeanWord')
export type FromSymbolsMeanWord = TypeOf<typeof fromSymbolsMeanWord>


export const fromSymbolsMeanWordItem = excess(intersection([
  type({
    word: array(fromSymbolsMeanWord),
    part: string,
  }),
  partial({
  }),
]), 'fromSymbolsMeanWord')
export type FromSymbolsMeanWordItem = TypeOf<typeof fromSymbolsMeanWordItem>


export const fromSymbolsMean = excess(intersection([
  type({
    word_symbol: string,
    word: array(fromSymbolsMeanWordItem),
  }),
  partial({
  }),
]), 'fromSymbolsMean')
export type FromSymbolsMean = TypeOf<typeof fromSymbolsMean>


export const baseInfoNormal = excess(intersection([
  type({
    translate_type: union([literal(1), literal('1')]),
  }),
  partial({
    exchange,
    baesElse: any,
    items: array(string),
    frequence: number,
    // fromSymbolsMean: array(fromSymbolsMean),
    fromSymbolsMean: any,
    is_CRI: union([string, number]),
    symbols: array(symbol),
    word_id: string,
    word_name: string,
    word_tag: array(number),
    suggest: array(type({
      key: string,
    })),
  }),
]), 'base-info-normal')
export type BaseInfoNormal = TypeOf<typeof baseInfoNormal>

export const baseInfoTranslate = excess(type({
  ciba_translate_msg: string,
  ciba_translate_result: string,
  praise_open_close: number,
  translate_lang: string,
  translate_msg: string,
  translate_result: string,
  translate_type: union([literal(2), literal(3), literal('2'), literal('3')]),
}), 'base-info-translate')
export type BaseInfoTranslate = TypeOf<typeof baseInfoTranslate>


export const baseInfoSuggestion = excess(type({
  translate_type: union([literal(3), literal('3')]),
  suggest: array(excess(intersection([
    type({
      key: string,
    }),
    partial({
      paraphrase: string,
      value: number,
    }),
  ]))),
}), 'base-info-suggest')
export type BaseInfoSuggestion = TypeOf<typeof baseInfoSuggestion>


export const baseInfo = union([
  baseInfoNormal,
  baseInfoTranslate,
  baseInfoSuggestion,
])
export type BaseInfo = TypeOf<typeof baseInfo>
