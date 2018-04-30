import querystring from 'querystring'
import { got } from '~/src/lib/gmapi'

/* eslint-disable camelcase */
import type_0_google from '~/src/assets/img/googleDict/type_0_google.svg'
import type_1_google_299386 from '~/src/assets/img/googleDict/type_1_google_299386.svg'
import type_2_search_281764 from '~/src/assets/img/googleDict/type_2_search_281764.svg'
import type_3_search_281781 from '~/src/assets/img/googleDict/type_3_search_281781.svg'
import type_4_google_356049 from '~/src/assets/img/googleDict/type_4_google_356049.svg'
/* eslint-enable camelcase */

import AbstractTranslateProvider from '../AbstractTranslateProvider'

import GoogleDictContainer from './container/GoogleDictContainer.vue'

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
    ].map(icon => AbstractTranslateProvider.createIcon(icon))
  }

  public translateCallback() {
    if (this.componentInstance) {
      this.componentInstance.visibleCallback()
    }
  }

  public async translate(word: string) {
    if (this.componentInstance) {
      this.componentInstance.dictionaryData = null
    }
    const apiUrlBase = 'https://content.googleapis.com/dictionaryextension/v1/knowledge/search?'
    const query = {
      term: word,
      language: 'en',
      corpus: 'en-US',
      country: 'US',
      // corpus: 'en',
      // country: 'UK',
      // this key is hard coded in background.min.js
      // https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
      key: 'AIzaSyC9PDwo2wgENKuI8DSFOfqFqKP2cKAxxso',
    }
    const apiUrl = `${apiUrlBase}${querystring.stringify(query)}`
    const response = await got({
      method: 'GET',
      /* eslint-disable max-len */
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
      /* eslint-enable max-len */
      url: apiUrl,
      timeout: 10000,
    })
    const data = JSON.parse(response.responseText)
    if (this.componentInstance === null) {
      return Promise.reject(new Error('查询结果挂载失败！'))
    }
    this.componentInstance.modalVisible = false
    this.componentInstance.dictionaryData = data.dictionaryData
    console.log(JSON.parse(response.responseText))
    return Promise.resolve()
  }
}

export default GoogleDictProvider
