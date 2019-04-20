import * as queryString from 'querystring'

import { got } from '~/util/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import getToken from './helpers/token'
import BaiduTranslateContainer from './container/BaiduTranslateContainer.vue'
import containerData from './containerData'

import { PROVIDER } from '~/constants/constant'
import store from '~/store'

interface TranslateParams {
  from: string
  query: string
  // transtype: 'translang'
  // simple_means_flag: 3
  sign: string
  token: string
}

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.BAIDU_TRANSLATE
  public settingDescriptor = []
  public containerComponentClass = BaiduTranslateContainer

  public async translate(word: string) {
    let result: any
    try {
      result = await this.internalTranslate(word)
    } catch (e) {
      throw e
    }
    return () => {
      containerData.data = result
    }
  }

  private async internalTranslate(word: string) {
    const fromLang = await this.detectLang(word)
    try {
      const token = await getToken(word)

      return this.getTranslateResult({
        query: word,
        from: fromLang,
        ...token,
      })
    } catch (e) {
      // 若请求失败则强制刷新token
      const token = await getToken(word, true)

      return this.getTranslateResult({
        query: word,
        from: fromLang,
        ...token,
      })
    }
  }

  private async detectLang(word: string): Promise<string> {
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
      data: queryString.stringify(formdata),
      timeout: 5000,
    })
    const result = JSON.parse(response.responseText)
    if (result.error === 0) {
      return result.lan
    }
    throw new Error('检测翻译文本语言失败！')
  }

  private async getTranslateResult(params: TranslateParams) {
    let to = store.config[PROVIDER.BAIDU_TRANSLATE].targetLanguage

    if (params.from === to) {
      to = store.config[PROVIDER.BAIDU_TRANSLATE].secondTargetLanguage
    }

    const translationFormData = {
      ...params,
      to,
      transtype: 'translang',
      simple_means_flag: 3,
    }

    const response = await got({
      method: 'POST',
      headers: {
        'referer': 'https://fanyi.baidu.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': window.navigator.userAgent,
      },
      url: 'https://fanyi.baidu.com/v2transapi',
      data: queryString.stringify(translationFormData),
      timeout: 5000,
    })

    const result = JSON.parse(response.responseText)

    if (result.trans_result && result.trans_result.type === 2 && result.trans_result.status === 0) {
      return result.trans_result.data[0].dst
    }
    throw new Error('翻译出错！')
  }
}

export default new BaiduTranslateProvider()
