import { isLeft, left, right } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import { containerData } from './container/data'
import { Codec } from './types'
import { GoogleTranslateProvider } from '../GoogleTranslate'

const wordErrorCache = {} as Record<string, boolean>

const fetchGoogleDict = async (word: string, lang: string = 'uk') => {
  // const apiUrlBase = 'https://content.googleapis.com/dictionaryextension/v1/knowledge/search?'
  const apiUrlBase = 'https://content-dictionaryextension-pa.googleapis.com/v1/dictionaryExtensionData?'
  const query = {
    term: word,
    language: 'en',
    ...lang === 'uk' ? {
      corpus: 'en',
      country: 'UK',
    } : {
      corpus: 'en-US',
      country: 'US',
    },
    // this key is hard coded in background.min.js
    // https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
    // key: 'AIzaSyC9PDwo2wgENKuI8DSFOfqFqKP2cKAxxso',
    key: 'AIzaSyA6EEtrDCfBkHV8uU2lgGY-N383ZgAOo7Y',
  }
  const apiUrl = `${apiUrlBase}${new URLSearchParams(query).toString()}`

  const response = await got({
    method: 'GET',
    headers: {
      // 'accept': '*/*',
      // 'accept-encoding': 'gzip, deflate, br',
      // 'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
      // 'cache-control': 'no-cache',
      // 'pragma': 'no-cache',
      // 'user-agent': window.navigator.userAgent,
      // 'x-goog-encode-response-if-executable': 'base64',
      // 'x-javascript-user-agent': 'google-api-javascript-client/1.1.0',
      'x-origin': 'chrome-extension://mgijmajocgfcbeboacabfgobmjgjcoja',
      'x-referer': 'chrome-extension://mgijmajocgfcbeboacabfgobmjgjcoja',
      // 'x-requested-with': 'XMLHttpRequest',
    },
    url: apiUrl,
    timeout: 10000,
  })

  if (isLeft(response)) {
    const responseText = response.left.res.responseText
    if (responseText) {
      const result = JSON.parse(responseText)
      if (result?.error?.message) {
        throw new Error(result.error.message)
      }
    }
    throw new Error(`遇到错误: ${response.left.type} ${response.left.res.status}`)
  }


  const data = JSON.parse(response.right.responseText)
  if (Object.getOwnPropertyNames(data).length === 0) {
    throw new Error('无查询结果！')
  }
  return data as Codec
}

interface GoogleDictParams {
  word: string
}

export const translate = async ({ word }: GoogleDictParams) => {
  if (wordErrorCache[word]) {
    return left({
      redirect: GoogleTranslateProvider.id,
      redirectParams: { fromDict: true },
    })
  }

  let googleDictData: Codec
  try {
    googleDictData = await fetchGoogleDict(word, 'uk')
  } catch (e: any) {
    if (e.message === 'Backend Error') {
      // try googletranslate
      wordErrorCache[word] = true
      return left({ redirect: GoogleTranslateProvider.id })
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    return left({ message: e.message })
  }

  if (googleDictData.status !== 200) {
    return left({
      redirect: GoogleTranslateProvider.id,
      redirectParams: { fromDict: true },
    })
  }

  // dev only check
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const check = require('./types/check').default as (...args: Array<any>) => unknown
    check(googleDictData)
  }

  return right(() => {
    containerData.data = googleDictData.dictionaryData
    containerData.word = word
  })
}
