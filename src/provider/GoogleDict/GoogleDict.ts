import querystring from 'querystring'
import { got } from '~/util/gmapi'

/* eslint-disable camelcase */
import type_0_google from '~/assets/img/providerIcon/googleDict/type_0_google.svg'
import type_1_google_299386 from '~/assets/img/providerIcon/googleDict/type_1_google_299386.svg'
import type_2_search_281764 from '~/assets/img/providerIcon/googleDict/type_2_search_281764.svg'
import type_3_search_281781 from '~/assets/img/providerIcon/googleDict/type_3_search_281781.svg'
import type_4_google_356049 from '~/assets/img/providerIcon/googleDict/type_4_google_356049.svg'
/* eslint-enable camelcase */

import playAudio from '~/util/playAudio'
import copy from '~/util/copy'
import googleDictBus from '~/provider/GoogleDict/bus'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import GoogleDictContainer from './container/GoogleDictContainer.vue'
import check from './check'
import audioCache from './audioCache'
import containerData from './containerData'

import { PROVIDER } from '~/constants/constant'

class GoogleDictProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.GOOGLE_DICT
  public icons = [
    /* eslint-disable camelcase */
    type_0_google,
    type_1_google_299386,
    type_2_search_281764,
    type_3_search_281781,
    type_4_google_356049,
    /* eslint-enable camelcase */
  ]
  public settingDescriptor = []
  public containerComponentClass = GoogleDictContainer
  private audioCache = audioCache

  public constructor() {
    super()

    // bind methods
    this.handlePlay = this.handlePlay.bind(this)
    googleDictBus.on(googleDictBus.PLAY_AUDIO, this.handlePlay)
  }

  public async translate(word: string) {
    let data: any = this.fetchData(word, 'uk').catch(e => e)
    data = await data
    if (data instanceof Error) {
      return Promise.reject(data)
    }

    const copyData = copy(data)
    check(copyData)

    containerData.data = data.dictionaryData

    return Promise.resolve()
  }

  private async fetchData(word: string, lang: string = 'uk') {
    const apiUrlBase = 'https://content.googleapis.com/dictionaryextension/v1/knowledge/search?'
    const query = {
      term: word,
      language: 'en',
      ...(lang === 'uk' ? {
        corpus: 'en',
        country: 'UK',
      } : {
        corpus: 'en-US',
        country: 'US',
      }),
      // this key is hard coded in background.min.js
      // https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
      key: 'AIzaSyC9PDwo2wgENKuI8DSFOfqFqKP2cKAxxso',
    }
    const apiUrl = `${apiUrlBase}${querystring.stringify(query)}`

    try {
      const response = await got({
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
      const data = JSON.parse(response.responseText)
      if (Object.getOwnPropertyNames(data).length === 0) {
        throw new Error('无查询结果！')
      }
      return data
    } catch (e) {
      const responseText = e.response.responseText
      if (responseText) {
        const result = JSON.parse(responseText)
        throw new Error(result.error.errors[0].message)
      }
      throw new Error(`遇到错误: ${e.message} ${e.response.status}`)
    }
  }

  /** 播放音频 */
  private async handlePlay(url: string): Promise<void> {
    const volume = 0.6
    const mp3Url = `https:${url}`
    // check cache
    if (mp3Url in this.audioCache) {
      playAudio(this.audioCache[mp3Url], volume)
    } else {
      const urlObj = new URL(mp3Url)
      try {
        const response = await got({
          method: 'GET',
          binary: true,
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': urlObj.host,
            'Pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'User-Agent': window.navigator.userAgent,
          },
          responseType: 'arraybuffer',
          url: mp3Url,
          timeout: 5000,
        })

        const arrayBuffer = response.response
        this.audioCache[mp3Url] = arrayBuffer
        playAudio(arrayBuffer, volume)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return Promise.resolve()
  }
}

export default new GoogleDictProvider()
