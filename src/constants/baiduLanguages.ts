export enum BAIDU_LANGUAGES {
  de = 'de',
  ru = 'ru',
  fra = 'fra',
  jp = 'jp',
  spa = 'spa',
  zh = 'zh',
  en = 'en',
}

export const BAIDU_LANGUAGE_MAP = {
  [BAIDU_LANGUAGES.de]: '德语',
  [BAIDU_LANGUAGES.ru]: '俄语',
  [BAIDU_LANGUAGES.fra]: '法语',
  [BAIDU_LANGUAGES.jp]: '日语',
  [BAIDU_LANGUAGES.spa]: '西班牙语',
  [BAIDU_LANGUAGES.zh]: '中文',
  [BAIDU_LANGUAGES.en]: '英语',
}

export const baiduLanguagesOptions = Object
  .entries(BAIDU_LANGUAGE_MAP)
  .map(([k, v]) => ({
    text: v,
    key: k,
  }))

// languages
// [
//   {
//     text: '阿拉伯语',
//     key: 'ara',
//   },
//   {
//     text: '爱沙尼亚语',
//     key: 'est',
//   },
//   {
//     text: '保加利亚语',
//     key: 'bul',
//   },
//   {
//     text: '波兰语',
//     key: 'pl',
//   },
//   {
//     text: '丹麦语',
//     key: 'dan',
//   },
//   {
//     text: '德语',
//     key: 'de',
//   },
//   {
//     text: '俄语',
//     key: 'ru',
//   },
//   {
//     text: '法语',
//     key: 'fra',
//   },
//   {
//     text: '芬兰语',
//     key: 'fin',
//   },
//   {
//     text: '韩语',
//     key: 'kor',
//   },
//   {
//     text: '荷兰语',
//     key: 'nl',
//   },
//   {
//     text: '捷克语',
//     key: 'cs',
//   },
//   {
//     text: '罗马尼亚语',
//     key: 'rom',
//   },
//   {
//     text: '葡萄牙语',
//     key: 'pt',
//   },
//   {
//     text: '日语',
//     key: 'jp',
//   },
//   {
//     text: '瑞典语',
//     key: 'swe',
//   },
//   {
//     text: '斯洛文尼亚语',
//     key: 'slo',
//   },
//   {
//     text: '泰语',
//     key: 'th',
//   },
//   {
//     text: '文言文',
//     key: 'wyw',
//   },
//   {
//     text: '西班牙语',
//     key: 'spa',
//   },
//   {
//     text: '希腊语',
//     key: 'el',
//   },
//   {
//     text: '匈牙利语',
//     key: 'hu',
//   },
//   {
//     text: '中文',
//     key: 'zh',
//   },
//   {
//     text: '英语',
//     key: 'en',
//   },
//   {
//     text: '意大利语',
//     key: 'it',
//   },
//   {
//     text: '越南语',
//     key: 'vie',
//   },
//   {
//     text: '粤语',
//     key: 'yue',
//   },
//   {
//     text: '中文繁体',
//     key: 'cht',
//   },
// ]
