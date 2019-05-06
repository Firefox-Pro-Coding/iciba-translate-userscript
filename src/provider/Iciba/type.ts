export interface IcibaResult {
  _word_flag: number
  antonym?: Array<Onym>
  auth_sentence: Array<AuthSentence>
  baseInfo: BaseInfo
  bidec?: Bidec
  cetFour?: CetFour
  collins?: Array<Collin>
  ee_mean?: Array<EeMean>
  errmsg: string
  errno: number
  exchanges: Array<string>
  jushi?: Array<Jushi>
  netmean?: Netmean
  phrase?: Array<Phrase>
  sameAnalysis?: Array<SameAnalysis>
  sentence: Array<IcibaResultSentence>
  synonym?: Array<Onym>
  trade_means?: Array<TradeMean>

  // translation
  result_from?: string
  word_name?: string
}

interface Onym {
  part_name: string
  means: Array<{
    word_mean: string
    cis: Array<string>
  }>
}

interface AuthSentence {
  id: string
  content: string
  link: string
  short_link: string
  source: string
  score: string
  cache_status: string
  tts_mp3: string
  tts_size: string
  diff: string
  oral: string
  res_content: string
  res_content_con: string
  res_key: string
  source_type: number
  source_id: number
  source_title: string
}

type BaseInfo = BaseInfoWord | BaseInfoTranslation

interface BaseInfoWord {
  word_name: string
  is_CRI: number
  exchange: { [key: string]: Array<string> }
  symbols: Array<BaseInfoSymbol>
  translate_type: number
}

interface BaseInfoTranslation {
  translate_result: string
  translate_type: number
  translate_lang: string
  ciba_translate_result: string
  ciba_translate_msg: string
  praise_open_close: number
  translate_msg: string
  word_name: string
}

interface BaseInfoSymbol {
  ph_en: string
  ph_am: string
  ph_other: string
  ph_en_mp3: string
  ph_am_mp3: string
  ph_tts_mp3: string
  parts: Array<SymbolPart>
}

interface SymbolPart {
  part: string
  means: Array<string>
}

interface Bidec {
  word_name: string
  parts: Array<BidecPart>
}

interface BidecPart {
  part_name: string
  word_id: string
  part_id: string
  means: Array<PartMean>
}

interface PartMean {
  word_mean: string
  part_id: string
  mean_id: string
  sentences: Array<PurpleSentence>
}

interface PurpleSentence {
  en: string
  cn: string
}

interface CetFour {
  word: string
  count: number
  kd: Array<any>
  Sentence: Array<Sentence>
}

interface Sentence {
  sentence: string
  come: string
}

interface Collin {
  item: string
  tran: string
  entry: Array<Entry>
  usage_note?: UsageNote
  phvb?: Array<Phvb>
}

interface Entry {
  posp: string
  tran: string
  def: string
  example: Array<Example>
}

interface Example {
  ex: string
  tran: string
  tts_mp3: string
  tts_size: string
}

interface Phvb {
  phrase: string
}

interface UsageNote {
  note: string
  translation: string
}

interface EeMean {
  part_name: string
  means: Array<EeMeanMean>
}

interface EeMeanMean {
  word_mean: string
  sentences: Array<FluffySentence>
}

interface FluffySentence {
  sentence: string
}

interface Jushi {
  english: string
  chinese: string
  mp3: string
}

interface Netmean {
  PerfectNetExp: Array<PerfectNetExp>
  RelatedPhrase: Array<RelatedPhrase>
}

interface PerfectNetExp {
  id: string
  key: string
  exp: string
  url: string
  bas: number
  abs: string
}

interface RelatedPhrase {
  word: string
  list: Array<PerfectNetExp>
}

interface Phrase {
  cizu_name: string
  jx: Array<Jx>
}

interface Jx {
  jx_en_mean: string
  jx_cn_mean: string
  lj: Array<{ [key: string]: string }>
}

interface SameAnalysis {
  part_name: string
  word_list: string
  means: Array<string>
}

interface IcibaResultSentence {
  Network_id: string
  Network_en: string
  Network_cn: string
  tts_mp3: string
  tts_size: string
  source_type: number
  source_id: number
  source_title: string
}

interface TradeMean {
  word_trade: string
  word_mean: Array<string>
}
