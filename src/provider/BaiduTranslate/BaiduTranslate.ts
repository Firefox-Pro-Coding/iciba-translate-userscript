import * as queryString from 'querystring'

import iconBase64 from '~/src/assets/img/providerIcon/baiduTranslate/baidu.svg'
import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import getToken from './helpers/token'
import BaiduTranslateContainer from './container/BaiduTranslateContainer.vue'

interface TranslateParams {
  from: string
  query: string
  // transtype: 'translang'
  // simple_means_flag: 3
  sign: string
  token: string
}

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'BaiduTranslate'
  public settingDescriptor = []
  public containerComponentClass = BaiduTranslateContainer

  public constructor() {
    super()
    this.icons = [
      iconBase64,
    ]
  }

  public async translate(word: string) {
    let result
    try {
      result = await this.internalTranslate(word)
      if (this.componentInstance) {
        this.componentInstance.translateResult = result
      }
    } catch (e) {
      return Promise.reject(e)
    }
    return Promise.resolve()
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
    const translationFormData = {
      ...params,
      to: params.from === 'zh' ? 'en' : 'zh',
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
    if (result.trans_result.type === 2 && result.trans_result.status === 0) {
      return result.trans_result.data[0].dst
    }
    throw new Error('翻译出错！')
  }
}

export default new BaiduTranslateProvider()
