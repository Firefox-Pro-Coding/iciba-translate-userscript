export enum ALI_API_LANGUAGES {
  zh = 'zh',
  en = 'en',
  ja = 'ja',
  ko = 'ko',
  fr = 'fr',
  es = 'es',
  it = 'it',
  tu = 'tu',
  ru = 'ru',
  pt = 'pt',
  vi = 'vi',
  id = 'id',
  th = 'th',
  ms = 'ms',
}

export const ALI_API_LANGUAGE_MAP = {
  [ALI_API_LANGUAGES.zh]: '中文',
  [ALI_API_LANGUAGES.en]: '英语',
  [ALI_API_LANGUAGES.ja]: '日语',
  [ALI_API_LANGUAGES.ko]: '韩语',
  [ALI_API_LANGUAGES.fr]: '法语',
  [ALI_API_LANGUAGES.es]: '西班牙语',
  [ALI_API_LANGUAGES.it]: '意大利语',
  [ALI_API_LANGUAGES.tu]: '土耳其语',
  [ALI_API_LANGUAGES.ru]: '俄语',
  [ALI_API_LANGUAGES.pt]: '葡萄牙语',
  [ALI_API_LANGUAGES.vi]: '越南语',
  [ALI_API_LANGUAGES.id]: '印尼语',
  [ALI_API_LANGUAGES.th]: '泰语',
  [ALI_API_LANGUAGES.ms]: '马来语',
}

export const aliApiLanguagesOptions = Object
  .entries(ALI_API_LANGUAGE_MAP)
  .map(([k, v]) => ({
    text: v,
    key: k,
  }))
