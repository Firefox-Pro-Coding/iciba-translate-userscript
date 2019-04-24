export enum SOUGOU_LANGUAGES {
  zhs = 'zh-CHS',
  en = 'en',
  fr = 'fr',
  de = 'de',
  ja = 'ja',
  ru = 'ru',
  es = 'es',
}

export const SOUGOU_LANGUAGE_MAP = {
  [SOUGOU_LANGUAGES.zhs]: '中文',
  [SOUGOU_LANGUAGES.en]: '英语',
  [SOUGOU_LANGUAGES.fr]: '法语',
  [SOUGOU_LANGUAGES.de]: '德语',
  [SOUGOU_LANGUAGES.ja]: '日语',
  [SOUGOU_LANGUAGES.ru]: '俄语',
  [SOUGOU_LANGUAGES.es]: '西班牙语',
}

export const sougouLanguagesOptions = Object
  .entries(SOUGOU_LANGUAGE_MAP)
  .map(([k, v]) => ({
    text: v,
    key: k,
  }))

// languages
// [
//   {
//     "text": "阿拉伯语",
//     "value": "ar"
//   },
//   {
//     "text": "爱沙尼亚语",
//     "value": "et"
//   },
//   {
//     "text": "保加利亚语",
//     "value": "bg"
//   },
//   {
//     "text": "波兰语",
//     "value": "pl"
//   },
//   {
//     "text": "波斯尼亚语",
//     "value": "bs-Latn"
//   },
//   {
//     "text": "波斯语",
//     "value": "fa"
//   },
//   {
//     "text": "白苗文",
//     "value": "mww"
//   },
//   {
//     "text": "丹麦语",
//     "value": "da"
//   },
//   {
//     "text": "德语",
//     "value": "de"
//   },
//   {
//     "text": "俄语",
//     "value": "ru"
//   },
//   {
//     "text": "法语",
//     "value": "fr"
//   },
//   {
//     "text": "芬兰语",
//     "value": "fi"
//   },
//   {
//     "text": "斐济语",
//     "value": "fj"
//   },
//   {
//     "text": "菲律宾语",
//     "value": "fil"
//   },
//   {
//     "text": "海地克里奥尔语",
//     "value": "ht"
//   },
//   {
//     "text": "韩语",
//     "value": "ko"
//   },
//   {
//     "text": "荷兰语",
//     "value": "nl"
//   },
//   {
//     "text": "加泰隆语",
//     "value": "ca"
//   },
//   {
//     "text": "捷克语",
//     "value": "cs"
//   },
//   {
//     "text": "克林贡语",
//     "value": "tlh"
//   },
//   {
//     "text": "克林贡语(piqaD)",
//     "value": "tlh-Qaak"
//   },
//   {
//     "text": "克罗地亚语",
//     "value": "hr"
//   },
//   {
//     "text": "克雷塔罗奥托米语",
//     "value": "otq"
//   },
//   {
//     "text": "罗马尼亚语",
//     "value": "ro"
//   },
//   {
//     "text": "拉脱维亚语",
//     "value": "lv"
//   },
//   {
//     "text": "立陶宛语",
//     "value": "lt"
//   },
//   {
//     "text": "马来语",
//     "value": "ms"
//   },
//   {
//     "text": "马耳他语",
//     "value": "mt"
//   },
//   {
//     "text": "马尔加什语",
//     "value": "mg"
//   },
//   {
//     "text": "孟加拉语",
//     "value": "bn"
//   },
//   {
//     "text": "南非荷兰语",
//     "value": "af"
//   },
//   {
//     "text": "挪威语",
//     "value": "no"
//   },
//   {
//     "text": "葡萄牙语",
//     "value": "pt"
//   },
//   {
//     "text": "日语",
//     "value": "ja"
//   },
//   {
//     "text": "瑞典语",
//     "value": "sv"
//   },
//   {
//     "text": "斯洛文尼亚语",
//     "value": "sl"
//   },
//   {
//     "text": "塞尔维亚语(拉丁文)",
//     "value": "sr-Latn"
//   },
//   {
//     "text": "塞尔维亚语(西里尔文)",
//     "value": "sr-Cyrl"
//   },
//   {
//     "text": "斯洛伐克语",
//     "value": "sk"
//   },
//   {
//     "text": "斯瓦希里语",
//     "value": "sw"
//   },
//   {
//     "text": "萨摩亚语",
//     "value": "sm"
//   },
//   {
//     "text": "泰语",
//     "value": "th"
//   },
//   {
//     "text": "土耳其语",
//     "value": "tr"
//   },
//   {
//     "text": "汤加语",
//     "value": "to"
//   },
//   {
//     "text": "塔希提语",
//     "value": "ty"
//   },
//   {
//     "text": "尤卡坦玛雅语",
//     "value": "yua"
//   },
//   {
//     "text": "威尔士语",
//     "value": "cy"
//   },
//   {
//     "text": "乌克兰语",
//     "value": "uk"
//   },
//   {
//     "text": "乌尔都语",
//     "value": "ur"
//   },
//   {
//     "text": "西班牙语",
//     "value": "es"
//   },
//   {
//     "text": "希腊语",
//     "value": "el"
//   },
//   {
//     "text": "匈牙利语",
//     "value": "hu"
//   },
//   {
//     "text": "希伯来语",
//     "value": "he"
//   },
//   {
//     "text": "英语",
//     "value": "en"
//   },
//   {
//     "text": "意大利语",
//     "value": "it"
//   },
//   {
//     "text": "印地语",
//     "value": "hi"
//   },
//   {
//     "text": "印度尼西亚语",
//     "value": "id"
//   },
//   {
//     "text": "越南语",
//     "value": "vi"
//   },
//   {
//     "text": "粤语(繁体)",
//     "value": "yue"
//   },
//   {
//     "text": "中文",
//     "value": "zh-CHS"
//   },
//   {
//     "text": "中文繁体",
//     "value": "zh-CHT"
//   }
// ]
