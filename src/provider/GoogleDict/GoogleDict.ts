import querystring from 'querystring'
import { got, GMXMLError } from '~/util/gmapi'

import { PROVIDER } from '~/constants/constant'
import { audioCacheService } from '~/service/audioCache'
import { googleDictBus, EVENTS as GVENTS } from '~/provider/GoogleDict/bus'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import GoogleDictContainer from './container/GoogleDictContainer.vue'
import { containerData } from './containerDataStore'
import { EVENTS, bus } from '~/service/globalBus'

type UnPromisify<T> = T extends Promise<infer U> ? U : T

const wordErrorCache = {} as Record<string, boolean>

class GoogleDictProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.GOOGLE_DICT
  public containerComponentClass = GoogleDictContainer

  public constructor() {
    super()

    // bind methods
    this.handlePlay = this.handlePlay.bind(this)
    googleDictBus.on(GVENTS.PLAY_AUDIO, this.handlePlay)
  }

  public async translate(word: string) {
    if (wordErrorCache[word]) {
      return this.tryGoogleTranslate(word)
    }

    let googleDictData: any
    try {
      googleDictData = await this.fetchGoogleDict(word, 'uk')
    } catch (e) {
      if (e.message === 'Backend Error') {
        // try googletranslate
        wordErrorCache[word] = true
        return this.tryGoogleTranslate(word)
      }
      throw e
    }

    // dev only check
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line
      const check = require('./check').default
      check(googleDictData, word)
    }

    return () => {
      containerData.data = googleDictData.dictionaryData
      containerData.word = word
    }
  }

  private tryGoogleTranslate(word: string) {
    window.setTimeout(() => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word,
        param: {
          provider: PROVIDER.GOOGLE_TRANSLATE,
          param: {
            fromDict: true,
          },
        },
      })
    })

    return () => {
      containerData.data = null
      containerData.word = word
    }
  }

  private async fetchGoogleDict(word: string, lang: string = 'uk') {
    const apiUrlBase = 'https://content.googleapis.com/dictionaryextension/v1/knowledge/search?'
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
      key: 'AIzaSyC9PDwo2wgENKuI8DSFOfqFqKP2cKAxxso',
    }
    const apiUrl = `${apiUrlBase}${querystring.stringify(query)}`

    let response: UnPromisify<ReturnType<typeof got>>

    try {
      response = await got({
        method: 'GET',
        headers: {
          'accept': '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
          'cache-control': 'no-cache',
          'pragma': 'no-cache',
          'user-agent': window.navigator.userAgent,
          'x-goog-encode-response-if-executable': 'base64',
          'x-javascript-user-agent': 'google-api-javascript-client/1.1.0',
          'x-origin': 'chrome-extension://mgijmajocgfcbeboacabfgobmjgjcoja',
          'x-referer': 'chrome-extension://mgijmajocgfcbeboacabfgobmjgjcoja',
          'x-requested-with': 'XMLHttpRequest',
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
    return data
  }

  /** 播放音频 */
  private async handlePlay(url: string): Promise<void> {
    const volume = 0.7
    const mp3Url = `https:${url}`

    if (audioCacheService.play(mp3Url, volume)) {
      return
    }

    const response = await got<ArrayBuffer>({
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'upgrade-insecure-requests': '1',
        'User-Agent': window.navigator.userAgent,
      },
      responseType: 'arraybuffer',
      url: mp3Url,
      timeout: 5000,
    })
    audioCacheService.play(mp3Url, response.response, volume)
  }
}

export default new GoogleDictProvider()
