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

export interface IcibaPlayAudioPayload {
  url: string
}

/** 行业词典 */
export const tradeMean = excess(type({
  word_trade: string,
  word_mean: array(string),
}), 'tradeMean')
export type TradeMean = TypeOf<typeof tradeMean>


export const tikWordInfo = excess(intersection([
  type({
    is_have_video_info: number,
  }),
  partial({
    video_bg_image: string,
  }),
]))
export type TikWordInfo = TypeOf<typeof tikWordInfo>


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


// 词根词缀
export const stemsAffix = excess(type({
  type: string, // 类型（词根|词缀）
  type_value: string, // 词根词缀 的 部分
  type_exp: string, // 词根解释
  word_parts: array(wordPart), // 解释 item
}), 'StemsAffix')
export type StemsAffix = TypeOf<typeof stemsAffix>


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


export const sameAnalysis = excess(type({
  part_name: string,
  word_list: string,
  means: array(string),
}), 'sameAnalysis')
export type SameAnalysis = TypeOf<typeof sameAnalysis>


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


export const collinExample = excess(intersection([
  type({
    ex: string, // 原句
    tran: string, // 翻译
  }),
  partial({
    tts_mp3: string, // url
    tts_size: string, // xxK
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


export const purpleSentence = excess(type({
  en: string,
  cn: string,
}), 'purpleSentence')
export type PurpleSentence = TypeOf<typeof purpleSentence>


export const partMean = excess(type({
  word_mean: string,
  part_id: string,
  mean_id: string,
  sentences: array(purpleSentence),
}), 'partMean')
export type PartMean = TypeOf<typeof partMean>


export const bidecPart = excess(type({
  part_name: string,
  word_id: string,
  part_id: string,
  means: array(partMean),
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


export const Means = excess(type({
  word_mean: string,
  cis: array(string),
}), 'Means')
export type Means = TypeOf<typeof Means>


/** 同反义词 */
export const thesaurus = excess(type({
  part_name: string,
  means: array(Means),
}), 'thesaurus')
export type Thesaurus = TypeOf<typeof thesaurus>


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


/** 汉字 */
export const chineseZiItem = excess(type({
  id: string, // "1171"
  hanzi: string, // "提"
  pinxie: string, // ""
  pinyin: string, // "dī"
  fanti: string, // ""
  bushou: string, // "扌部"
  bihua: string, // "12笔"
  wubi: string, // "RJGH"
  biaoma: string, // "FDTV。另见tí。"
  zaozi: string, // "形声；从扌、是声"
  jiegou: string, // "左右结构"
  ciyu: string, // "提防,提溜,"
  jieshi: string, // "提防。"
  fanyi: string, // ""
  xingsi: string, // ""
  tongyin: string, // "见“滴”"
  yanbian: string, // "0"
  nixu: string, // ""
  english: string, // "提防：guard against"
  ziyi: array(string), // ["提防。"]
  sid: string, // "1171"
}), 'chinese-zi-item')
export type ChineseZiItem = TypeOf<typeof chineseZiItem>

/** 词组 */
export const chineseCi = excess(type({
  id: string, // "83711"
  ciyu: string, // "你好"
  pinxie: string, // "nihao"
  pinyin: string, // "nǐ hǎo"
  jieshi: string, // "(名)①乔木,果实圆形.味甜或略酸,是普通水果.②这种植物的果实.买~.(作宾语)〈外〉梵语."
  goucheng: string,
  tongyi: string,
  fanyi: string,
  tongyin: string,
  liju: string,
  zi: string, // "你"
  zid: string, // "4383"
  ciyi: union([
    string,
    array(string), // ["（名）乔木；果实圆形。味甜或略酸；是普通水果。", "（名）这种植物的果实。买～。（作宾语）〈外〉梵语。"]
  ]),
}), 'chinese-ci')
export type ChineseCi = TypeOf<typeof chineseCi>

/** chinese */
export const chinese = excess(partial({
  ci: chineseCi,
  zi: array(chineseZiItem),
}), 'chinese')
export type Chinese = TypeOf<typeof chinese>


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
    translate_type: literal(1),
  }),
  partial({
    exchange,
    fromSymbolsMean: array(fromSymbolsMean),
    is_CRI: union([string, number]),
    symbols: array(symbol),
    word_id: string,
    word_name: string,
    suggest: array(type({
      key: string,
    })),
  }),
]), 'base-info-normal')
export type BaseInfoNormal = TypeOf<typeof baseInfoNormal>

export const baseInfoTranslate = excess(type({
  translate_result: string,
  translate_type: union([literal(2), literal(3)]),
  translate_lang: string,
  ciba_translate_result: string,
  ciba_translate_msg: string,
  praise_open_close: number,
  translate_msg: string,
  word_name: string,
}), 'base-info-translate')
export type BaseInfoTranslate = TypeOf<typeof baseInfoTranslate>


export const baseInfoSuggestion = excess(type({
  translate_type: literal(3),
  suggest: array(excess(intersection([
    type({
      key: string,
    }),
    partial({
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


const ciThesaurus = excess(type({
  ci_name: string,
}))


export const sentence = excess(intersection([
  type({
    cn: string, // "一块苹果派"
    en: string, // "a slice of apple pie"
    from: string, // "——《牛津高阶英汉双解词典》"
    id: union([number, string]), // 2259679 | "1160391"
    ttsSize: union([number, string]), // 8 | "26" (kb)
    ttsUrl: string, // http://res-tts.iciba.com/tts_new_dj/4/7/1/4713a7302c67b16ec5072f84cfe47a9d.mp3
    type: union([
      literal(0),
      literal(1),
    ]),
  }),
  partial({
    likeNum: number, // 0 (喜欢数？)
  }),
]), 'sentence')
export type Sentence = TypeOf<typeof sentence>


export const newSentence = excess(type({
  meaning: string,
  sentences: array(sentence),
  tag: string,
  word: string,
}), 'new_sentence')
export type NewSentence = TypeOf<typeof newSentence>


export const meanData = excess(type({
  mean: string, // "解释（词语）的含义；给（词语）下定义"
  part: string, // "v."
  displayNum: number, // 7
}), 'data-mean')
export type MeanData = TypeOf<typeof meanData>


const identityDicNewMean = excess(type({
  data: array(meanData),
  explanation: string,
  explanationTitle: string,
  title: string,
  totalNum: number,
  type: literal('mean'), // 高考释义分布
}))
export type IdentityDicNewMean = TypeOf<typeof identityDicNewMean>


export const examRate = excess(type({
  num: number, // 0 - 1 percentage
  title: string,
}), 'data-examRate')
export type ExamRate = TypeOf<typeof examRate>


const identityDicNewExamRate = excess(type({
  data: array(examRate),
  explanation: string,
  explanationTitle: string,
  title: string,
  type: literal('examRate'), // 高考题型分布
}))
export type IdentityDicNewExamRate = TypeOf<typeof identityDicNewExamRate>


export const expandKnowledgeList = union([
  excess(type({
    fixed_phrase_list: array(excess(type({
      cn: string,
      en: string,
    }))),
    title: string, // "固定搭配"
    type: literal('fixed_phrase'),
  }), 'fixed_phrase'),
  excess(type({
    sentence: array(excess(type({
      sentence,
      mean: meanData,
    }))),
    title: string, // "真题回顾"
    type: literal('sentence'),
  }), 'sentence'),
  excess(type({
    expand_knowledge_list: array(excess(type({
      cn: string,
      en: string,
    }))),
    title: string, // "扩展知识"
    type: literal('expand_knowledge'),
  }), 'expand_knowledge_list'),
])
export type ExpandKnowledgeList = TypeOf<typeof expandKnowledgeList>


const identityDicNewKnowledge = excess(type({
  data: array(expandKnowledgeList),
  title: string,
  type: literal('knowledge'), // 高分必备知识点
}))
export type IdentityDicNewKnowledge = TypeOf<typeof identityDicNewKnowledge>


export const identityDicNew = union([
  identityDicNewMean,
  identityDicNewExamRate,
  identityDicNewKnowledge,
], 'identity_dic_new')
export type IdentityDicNew = TypeOf<typeof identityDicNew>


export const codec2 = excess(intersection([
  type({
    _word_flag: literal(2),
    baseInfo,
    errmsg: string,
    errno: number,
    exchanges: array(string),
  }),
  partial({
    antonym: array(ciThesaurus),
    bidec,
    chinese,
    phrase: union([phrase, array(phrase)]),
    identity_dic_new: literal(''),
    new_sentence: union([array(newSentence), literal('')]),
    result_from: string,
    sentence: array(icibaSentence),
    synonym: array(ciThesaurus),
    trade_means: array(tradeMean),
    word_name: string,
  }),
]), 'codec2')
export type Codec2 = TypeOf<typeof codec2>


export const codec1 = excess(intersection([
  type({
    _word_flag: literal(1),
    baseInfo,
    errmsg: string,
    errno: number,
    exchanges: array(string), // 变形。 length为 2 时为[复数, word] length为 5 时为[过去式, 过去分词, 现在分词, 第三人称单数, word]
  }),
  partial({
    antonym: array(thesaurus),
    bidec,
    cetFour: cet,
    cetSix: cet,
    collins: array(collin),
    ee_mean: array(eeMean),
    identity_dic_new: union([array(identityDicNew), literal('')]),
    new_sentence: union([array(newSentence), literal('')]),
    phrase: union([phrase, array(phrase)]),
    result_from: string,
    sameAnalysis: array(sameAnalysis),
    sentence: array(icibaSentence),
    stems_affixes: array(stemsAffix),
    synonym: array(thesaurus),
    tik_word_info: tikWordInfo,
    trade_means: array(tradeMean),
    word_name: string,
  }),
]), 'codec1')
export type Codec1 = TypeOf<typeof codec1>


export const codec = union([
  codec1,
  codec2,
], 'codec')
export type Codec = TypeOf<typeof codec>
