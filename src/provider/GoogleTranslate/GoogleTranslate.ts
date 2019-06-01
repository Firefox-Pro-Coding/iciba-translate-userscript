import * as quertstring from 'querystring'
import { got } from '~/util/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import getToken from './helpers/token'
import GoogleTranslateContainer from './container/GoogleTranslateContainer.vue'
import containerData from './containerData'

import { PROVIDER, GOOGLE_TRANSLATE_HOST } from '~/constants/constant'
import store from '~/store/index'

class GoogleTranslateProvider extends AbstractTranslateProvider {
  public static apiQuery = {
    client: 'webapp',
    sl: 'auto',
    pc: '1',
    otf: '1',
    ssel: '0',
    tsel: '0',
    kc: '1',
    dt: [
      'at',
      'bd',
      'ex',
      'ld',
      'md',
      'qca',
      'rw',
      'rm',
      'ss',
      't',
      'gt',
    ],
    // ie: 'UTF-8',
    // oe: 'UTF-8',
    // source: 'btn',
  }

  public uniqName = PROVIDER.GOOGLE_TRANSLATE
  public settingDescriptor = []
  public containerComponentClass = GoogleTranslateContainer

  public async translate(word: string) {
    try {
      const result = await this.getGoogleTranslateResult(word)
      return () => {
        containerData.data = result
      }
    } catch (e) {
      throw e
    }
  }

  private async getGoogleTranslateResult(word: string, _tl?: string): Promise<Array<string>> {
    let token
    try {
      token = await getToken(word, this.getApiDomain())
    } catch (e) {
      throw new Error(`获取token失败！请检查网络。(${e.message})`)
    }

    const tl = _tl || store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage
    const query = {
      ...GoogleTranslateProvider.apiQuery,
      tl,
      hl: tl,
      tk: token,
      q: word,
    }

    const url = `https://${this.getApiDomain()}/translate_a/single?${quertstring.stringify(query)}`

    try {
      const result = await got({
        method: 'GET',
        headers: {
          'Referer': `https://${this.getApiDomain()}/`,
          'Cache-Control': 'max-age=0',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        url,
        timeout: 5000,
        responseType: 'json', // force auto json parse
      })
      const data = result.response
      const detectedLanguage: string = data[2]
      if (detectedLanguage === tl && detectedLanguage === store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage) {
        return this.getGoogleTranslateResult(word, store.config[PROVIDER.GOOGLE_TRANSLATE].secondTargetLanguage)
      }
      const translateResult = data[0].map((v: any) => (v[0] ? v[0] : ''))
      return translateResult
    } catch (e) {
      throw e
    }
  }

  private getApiDomain() {
    return {
      [GOOGLE_TRANSLATE_HOST.GOOGLE_COM]: 'translate.google.com',
      [GOOGLE_TRANSLATE_HOST.GOOGLE_CN]: 'translate.google.cn',
    }[store.config[PROVIDER.GOOGLE_TRANSLATE].translateHost]
  }
}

export default new GoogleTranslateProvider()
