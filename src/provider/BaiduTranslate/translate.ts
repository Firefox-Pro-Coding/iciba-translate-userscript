import { stringify } from 'querystring'
import { isRight, left, right } from 'fp-ts/lib/Either'
import { BAIDU_LANGUAGES } from '~/provider/BaiduTranslate/baiduLanguages'
import { got } from '~/util/gmapi'

import getToken from './helpers/token'
import containerData from './container/data'
import { store } from './store'

const detectLang = async (word: string): Promise<BAIDU_LANGUAGES> => {
  const formdata = {
    query: Array.from(word).splice(0, 50).join(''),
  }
  const response = await got({
    method: 'POST',
    headers: {
      'referer': 'https://fanyi.baidu.com',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    url: 'https://fanyi.baidu.com/langdetect',
    data: stringify(formdata),
    timeout: 5000,
  })
  if (isRight(response)) {
    const result = JSON.parse(response.right.responseText)
    if (result.error === 0) {
      return result.lan as BAIDU_LANGUAGES
    }
  }
  throw new Error('检测翻译文本语言失败！')
}

const fetchTranslation = async ({ word, sl, tl }: { word: string, sl: string, tl: string }) => {
  let token
  try {
    token = await getToken(word)
  } catch (e) {
    token = await getToken(word, true)
  }

  const query = {
    from: sl,
    to: tl,
    query: word,
    transtype: 'translang',
    simple_means_flag: 3,
    sign: token.sign,
    token: token.token,
  }

  const response = await got({
    method: 'POST',
    headers: {
      'referer': 'https://fanyi.baidu.com',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': window.navigator.userAgent,
    },
    url: 'https://fanyi.baidu.com/v2transapi',
    data: stringify(query),
    timeout: 5000,
  })

  if (isRight(response)) {
    const result = JSON.parse(response.right.responseText)

    const trans_result = result.trans_result
    if (trans_result && trans_result.type === 2 && trans_result.status === 0) {
      return (trans_result.data as Array<any>).map((v: any) => v.dst as string)
    }
  }

  throw new Error('翻译出错！')
}

interface BaiduTranslateParams {
  word: string
  payload?: {
    sl: string
    tl: string
  }
}

export const translate = async (p: BaiduTranslateParams) => {
  try {
    const auto = !p.payload || p.payload.sl === 'auto'
    const sl = !p.payload || auto ? await detectLang(p.word) : p.payload.sl
    // eslint-disable-next-line no-nested-ternary
    const tl = p.payload
      ? p.payload.tl
      : store.data.targetLanguage !== sl
        ? store.data.targetLanguage
        : store.data.secondTargetLanguage

    const result = await fetchTranslation({ word: p.word, sl, tl })
    return right(() => {
      containerData.data = result
      containerData.inputText = p.word
      containerData.autoMode = auto
      containerData.sourceLanguage = sl
      containerData.targetLanguage = tl
    })
  } catch (e: any) {
    return left({
      message: e.message,
    })
  }
}
