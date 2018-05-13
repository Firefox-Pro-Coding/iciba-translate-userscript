import querystring from 'querystring'
import { got } from '~/src/lib/gmapi'

/* eslint-disable camelcase */
import type_0_google from '~/src/assets/img/providerIcon/googleDict/type_0_google.svg'
import type_1_google_299386 from '~/src/assets/img/providerIcon/googleDict/type_1_google_299386.svg'
import type_2_search_281764 from '~/src/assets/img/providerIcon/googleDict/type_2_search_281764.svg'
import type_3_search_281781 from '~/src/assets/img/providerIcon/googleDict/type_3_search_281781.svg'
import type_4_google_356049 from '~/src/assets/img/providerIcon/googleDict/type_4_google_356049.svg'
/* eslint-enable camelcase */

import AbstractTranslateProvider from '../AbstractTranslateProvider'

import GoogleDictContainer from './container/GoogleDictContainer.vue'

import check from './check'

class GoogleDictProvider extends AbstractTranslateProvider {
  public uniqName = 'GoogleDict'
  public settingDescriptor = []
  public containerComponentClass = GoogleDictContainer

  public constructor() {
    super()
    this.icons = [
      /* eslint-disable camelcase */
      type_0_google,
      type_1_google_299386,
      type_2_search_281764,
      type_3_search_281781,
      type_4_google_356049,
      /* eslint-enable camelcase */
    ]
  }

  public translateCallback() {
    if (this.componentInstance) {
      this.componentInstance.visibleCallback()
    }
  }

  public async translate(word: string) {
    if (this.componentInstance) {
      this.componentInstance.dictionaryData = null
      this.componentInstance.modalVisible = false
    }

    let data: any = this.fetchData(word, 'uk')
      .catch(() => this.fetchData(word, 'us').catch(e => e))
    data = await data
    if (data instanceof Error) {
      return Promise.reject(data)
    }

    const copy = JSON.parse(JSON.stringify(data))
    check(copy)

    if (this.componentInstance === null) {
      return Promise.reject(new Error('查询结果挂载失败！'))
    }
    this.componentInstance.modalVisible = false
    this.componentInstance.dictionaryData = data.dictionaryData

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
      if (Reflect.ownKeys(data).length === 0) {
        return Promise.reject(new Error('无查询结果！'))
      }
      return data
    } catch (e) {
      if (e.response && e.response.status === 500) {
        return Promise.reject(new Error('无查询结果！'))
      }
      return Promise.reject(new Error(`遇到错误: ${e.message}`))
    }
  }
}

export default GoogleDictProvider
