import {
  TypeOf,
  string,
  array,
  type,
  literal,
  number,
  union,
  partial,
  intersection,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

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


export const meanData = excess(type({
  mean: string, // "解释（词语）的含义；给（词语）下定义"
  part: string, // "v."
  displayNum: number, // 7
}), 'data-mean')
export type MeanData = TypeOf<typeof meanData>

export const examRate = excess(type({
  num: number, // 0 - 1 percentage
  title: string,
}), 'data-examRate')
export type ExamRate = TypeOf<typeof examRate>

const identityDicNewMean = excess(type({
  data: array(meanData),
  explanation: string,
  explanationTitle: string,
  flag: string,
  title: string,
  totalNum: number,
  type: literal('mean'), // 高考释义分布
}))
export type IdentityDicNewMean = TypeOf<typeof identityDicNewMean>


const identityDicNewExamRate = excess(type({
  data: array(examRate),
  explanation: string,
  explanationTitle: string,
  flag: string,
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


/** 牛津？ */
export const identityDicNew = union([
  identityDicNewMean,
  identityDicNewExamRate,
  identityDicNewKnowledge,
], 'identity_dic_new')
export type IdentityDicNew = TypeOf<typeof identityDicNew>
