import {
  type,
  array,
  string,
  number,
  TypeOf,
  intersection,
  partial,
  union,
  literal,
  any,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'
import { abbreviation } from './abbreviation'
import { baseInfo } from './baseInfo'
import { bidec } from './bidec'
import { cet } from './cet'
import { chinese } from './chinese'
import { collin } from './collins'
import { derivation } from './derivation'
import { eeMean } from './eeMean'
import { gaokao } from './gaokao'
import { sentence } from './identityDicNew'
import { phrase } from './phrase'
import { sameAnalysis } from './sameAnalysis'
import { stemsAffix } from './stemsAffix'
import { tikWordInfo } from './tikWordInfo'
import { tradeMean } from './tradeMean'

export * from './abbreviation'
export * from './baseInfo'
export * from './bidec'
export * from './cet'
export * from './chinese'
export * from './collins'
export * from './derivation'
export * from './eeMean'
export * from './gaokao'
export * from './identityDicNew'
export * from './phrase'
export * from './sameAnalysis'
export * from './stemsAffix'
export * from './thesaurus'
export * from './tikWordInfo'
export * from './tradeMean'

export interface IcibaPlayAudioPayload {
  url: string
}


/** 双语例句 */
export const icibaSentence = excess(type({
  Network_id: string,
  Network_en: string,
  Network_cn: string,
  tts_mp3: string,
  source_type: number,
  source_id: number,
  source_title: string,
  tts_size: string,
}), 'icibaSentence')
export type IcibaSentence = TypeOf<typeof icibaSentence>

const ciThesaurus = excess(type({
  ci_name: string,
}))
export type CiThesaurus = TypeOf<typeof ciThesaurus>


export const newSentence = excess(type({
  meaning: string,
  sentences: array(sentence),
  tag: string,
  word: string,
}), 'new_sentence')
export type NewSentence = TypeOf<typeof newSentence>

export const codec = excess(intersection([
  type({
    baseInfo,
  }),
  partial({
    abbreviation: array(abbreviation),
    // antonym: array(ciThesaurus),
    // antonym: array(thesaurus),
    antonym: any,
    bidec,
    chinese,
    cetFour: array(cet),
    cetSix: array(cet),
    collins: array(collin),
    derivation: array(derivation),
    ee_mean: array(eeMean),
    err_words: array(any),
    exchanges: array(string), // 变形。 length为 2 时为[复数, word] length为 5 时为[过去式, 过去分词, 现在分词, 第三人称单数, word]
    gaokao: array(gaokao),
    // identity_dic_new: union([array(identityDicNew), literal('')]),
    identity_dic_new: any,
    kaoyan: array(gaokao),
    new_sentence: union([array(newSentence), literal('')]),
    phrase: union([phrase, array(phrase)]),
    result_from: string,
    sameAnalysis: array(sameAnalysis),
    sentence: array(icibaSentence),
    share_info: any,
    slang: any,
    stems_affixes: array(stemsAffix),
    // synonym: array(thesaurus),
    synonym: any,
    synthesize: any,
    tik_word_info: tikWordInfo,
    trade_means: array(tradeMean),
    traditional: any,
    word_name: string,
  }),
]), 'codec')
export type Codec = TypeOf<typeof codec>
