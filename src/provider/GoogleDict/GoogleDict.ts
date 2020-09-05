import { stringify } from 'querystring'
import { left, right } from 'fp-ts/lib/Either'
import { got, GMXMLError } from '~/util/gmapi'
import { PROVIDER } from '~/constants/constant'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'

import { ProviderType } from '../provider'
import GoogleDictContainer from './container/GoogleDictContainer.vue'
import { containerData } from './containerDataStore'
import { Codec } from './types'

type UnPromisify<T> = T extends Promise<infer U> ? U : T

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
  const apiUrl = `${apiUrlBase}${stringify(query)}`

  let response: UnPromisify<ReturnType<typeof got>>

  try {
    response = await got({
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
  } catch (_e) {
    const e: GMXMLError = _e
    const responseText = e.response.responseText
    if (responseText) {
      const result = JSON.parse(responseText)
      if (result?.error?.message) {
        throw new Error(result.error.message)
      }
    }
    throw new Error(`遇到错误: ${e.message} ${e.response.status}`)
  }

  const data = JSON.parse(response.responseText)
  if (Object.getOwnPropertyNames(data).length === 0) {
    throw new Error('无查询结果！')
  }
  return data as Codec
}

const translate: ProviderType['translate'] = async (word: string) => {
  if (wordErrorCache[word]) {
    return left({
      redirect: PROVIDER.GOOGLE_TRANSLATE,
      redirectParams: { fromDict: true },
    })
  }

  let googleDictData: Codec
  try {
    googleDictData = await fetchGoogleDict(word, 'uk')
  } catch (e) {
    if (e.message === 'Backend Error') {
      // try googletranslate
      wordErrorCache[word] = true
      return left({ redirect: PROVIDER.GOOGLE_TRANSLATE })
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    return left({ message: e.message })
  }

  if (googleDictData.status !== 200) {
    return left({
      redirect: PROVIDER.GOOGLE_TRANSLATE,
      redirectParams: { fromDict: true },
    })
  }

  // dev only check
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const check = require('./check').default as (...args: Array<any>) => unknown
    check(googleDictData, word)
  }

  return right(() => {
    containerData.data = googleDictData.dictionaryData
    containerData.word = word
  })
}

/** 播放音频 */
const handlePlay = async (payload: PlayAudioAction): Promise<void> => {
  if (payload.id !== PROVIDER.GOOGLE_DICT) {
    return
  }
  const volume = 0.7
  const mp3Url = `https:${payload.params.url}`

  if (audioCacheService.play(mp3Url, volume)) {
    return
  }

  const response = await got<ArrayBuffer>({
    method: 'GET',
    headers: {
      // 'Accept': '*/*',
      // 'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
      // 'Cache-Control': 'no-cache',
      // 'Pragma': 'no-cache',
      'upgrade-insecure-requests': '1',
      // 'User-Agent': window.navigator.userAgent,
    },
    responseType: 'arraybuffer',
    url: mp3Url,
    timeout: 5000,
  })
  audioCacheService.play(mp3Url, response.response, volume)
}

audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)

export const googleDict: ProviderType = {
  id: PROVIDER.GOOGLE_DICT,
  view: GoogleDictContainer,
  translate,
}
