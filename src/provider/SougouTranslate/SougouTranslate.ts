import querystring from 'querystring'
import uuidv4 from 'uuid/v4'
import { got } from '~/util/gmapi'

import { PROVIDER } from '~/constants/constant'
import { SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'
import store from '~/store'

import AbstractTranslateProvider from '../AbstractTranslateProvider'

import SougouTranslateContainer from './container/SougouTranslateContainer.vue'
import containerData from './containerData'
import getToken from './getToken'

class SougouTranslateProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.SOUGOU_TRANSLATE
  public settingDescriptor = []
  public containerComponentClass = SougouTranslateContainer

  public async translate(word: string) {
    try {
      const result = await this.getSougouTranslateResult(word)
      return () => {
        containerData.data = result
      }
    } catch (e) {
      throw e
    }
  }

  private async getSougouTranslateResult(word: string, lang?: SOUGOU_LANGUAGES): Promise<Array<string>> {
    const to = lang || store.config[PROVIDER.SOUGOU_TRANSLATE].targetLanguage
    const token = getToken(word, 'auto', to)
    const body = {
      from: 'auto',
      to,
      text: word,
      client: 'pc',
      fr: 'browser_pc',
      pid: 'sogou-dict-vr',
      dict: 'true',
      word_group: 'true',
      second_query: 'true',
      uuid: uuidv4(),
      needQc: '1',
      s: token,
    }
    let res
    try {
      res = await got({
        method: 'POST',
        headers: {
          'Referer': 'https://fanyi.sogou.com/',
          'Cache-Control': 'max-age=0',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        url: 'https://fanyi.sogou.com/reventondc/translateV2',
        timeout: 5000,
        responseType: 'json',
        data: querystring.stringify(body).replace(/%20/g, '+'),
      })
    } catch (e) {
      throw e
    }
    const result = res.response

    if (!result || !result.data || !result.data.translate || !result.data.translate.dit) {
      throw new Error('翻译出错')
    }

    const detectLang = result.data.detect.detect
    if (detectLang === to && detectLang === store.config[PROVIDER.SOUGOU_TRANSLATE].targetLanguage) {
      return this.getSougouTranslateResult(word, store.config[PROVIDER.SOUGOU_TRANSLATE].secondTargetLanguage)
    }

    return result.data.translate.dit.split('\n')
  }
}

export default new SougouTranslateProvider()
