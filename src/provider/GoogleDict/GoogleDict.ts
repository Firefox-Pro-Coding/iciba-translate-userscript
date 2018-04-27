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
  public containerComponent = new GoogleDictContainer()

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

  public async translate(word: string) {
    const apiUrlBase = 'https://content.googleapis.com/dictionaryextension/v1/knowledge/search?'
    const query = {
      term: 'apple',
      language: 'en',
      corpus: 'en-US',
      country: 'US',
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
        // 'cookie': 'Hm_lvt_ba7c84ce230944c13900faeba642b2b4=1524762095; Hm_lpvt_ba7c84ce230944c13900faeba642b2b4=1524762095',
        'pragma': 'no-cache',
        // 'referer': 'https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.zzKzJmzQ0jc.O%2Fm%3D__features__%2Fam%3DAQE%2Frt%3Dj%2Fd%3D1%2Frs%3DAGLTcCN8-mbD5X4aP09_7anOxgNB7baFRg',
        'user-agent': window.navigator.userAgent,
        // 'x-client-data': 'CKm1yQEIj7bJAQijtskBCMG2yQEIqZ3KAQioo8oBCKKkygEYkqPKAQ==',
        // 'x-clientdetails': 'appVersion=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F66.0.3359.117%20Safari%2F537.36&platform=Win32&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F66.0.3359.117%20Safari%2F537.36',
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
    console.log(JSON.parse(response.responseText))
    return Promise.resolve()
  }
}

export default GoogleDictProvider
