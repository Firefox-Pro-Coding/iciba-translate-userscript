export enum PROVIDER {
  ICIBA = 'ICIBA',
  GOOGLE_DICT = 'GOOGLE_DICT',
  GOOGLE_TRANSLATE = 'GOOGLE_TRANSLATE',
  BAIDU_TRANSLATE = 'BAIDU_TRANSLATE',
  SOUGOU_TRANSLATE = 'SOUGOU_TRANSLATE',
  URBAN_DICTIONARY = 'URBAN_DICTIONARY',
  BING_TRANSLATE = 'BING_TRANSLATE',
  VOCABULARY = 'VOCABULARY',
}
export const PROVIDER_MAP = {
  [PROVIDER.ICIBA]: 'iciba查词',
  [PROVIDER.GOOGLE_DICT]: 'google字典',
  [PROVIDER.GOOGLE_TRANSLATE]: 'google翻译',
  [PROVIDER.BAIDU_TRANSLATE]: '百度翻译',
  [PROVIDER.SOUGOU_TRANSLATE]: '搜狗翻译',
  [PROVIDER.URBAN_DICTIONARY]: 'urban dictionary',
  [PROVIDER.BING_TRANSLATE]: 'bing 翻译',
  [PROVIDER.VOCABULARY]: 'vocabulary',
}
export const providerOptions = Object
  .entries(PROVIDER_MAP)
  .map(([k, v]) => ({
    label: v,
    key: k,
  })) as Array<{ key: PROVIDER, label: string }>

export const allProviders = providerOptions.map((v) => v.key)

type Keys = keyof typeof PROVIDER_MAP
export type ProviderTestFunc<T extends Keys> = (p: T) => any
export type ProviderTest = ProviderTestFunc<PROVIDER>

export enum GOOGLE_TRANSLATE_HOST {
  GOOGLE_COM = 'GOOGLE_COM',
  GOOGLE_CN = 'GOOGLE_CN',
}
export const GOOGLE_TRANSLATE_HOST_MAP = {
  [GOOGLE_TRANSLATE_HOST.GOOGLE_COM]: 'translate.google.com',
  [GOOGLE_TRANSLATE_HOST.GOOGLE_CN]: 'translate.google.cn',
}

export enum GOOGLE_DICT_FOLD_STATUS {
  FOLD = 'FOLD',
  HALF_FOLD = 'HALF_FOLD',
  UNFOLD = 'UNFOLD',
}
export const GOOGLE_DICT_FOLD_STATUS_MAP = {
  [GOOGLE_DICT_FOLD_STATUS.FOLD]: '折叠同反义词和子项',
  [GOOGLE_DICT_FOLD_STATUS.HALF_FOLD]: '折叠同反义词',
  [GOOGLE_DICT_FOLD_STATUS.UNFOLD]: '展开',
}
