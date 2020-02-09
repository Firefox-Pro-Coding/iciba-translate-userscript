import querystring from 'querystring'
import uuidv4 from 'uuid/v4'

import { PROVIDER } from '~/constants/constant'
import { got } from '~/util/gmapi'
import { store } from '~/service/store'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import SougouTranslateContainer from './container/SougouTranslateContainer.vue'
import containerData from './containerData'
import getToken from './getToken'
import getKey from './getKey'
import SougouTranslateBus, { PlayAudioPayload, NAMES } from './bus'
import { audioCacheService } from '~/service/audioCache'

export interface SougouTranslateParams {
  sl: string
  tl: string
}

class SougouTranslateProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.SOUGOU_TRANSLATE
  public settingDescriptor = []
  public containerComponentClass = SougouTranslateContainer
  public key = ''

  public constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
    SougouTranslateBus.on(NAMES.PLAY_AUDIO, this.handlePlay)
  }

  public async translate(word: string, payload?: SougouTranslateParams): Promise<() => void> {
    const sl = payload ? payload.sl : 'auto'
    const tl = payload ? payload.tl : store.config[PROVIDER.SOUGOU_TRANSLATE].targetLanguage

    if (!this.key) {
      this.key = await getKey()
    }

    const token = getToken(word, this.key, sl, tl)

    const body = {
      from: sl,
      to: tl,
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

    const res = await got<any>({
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

    const result = res.response

    if (!result || !result.data || !result.data.translate || !result.data.translate.dit) {
      throw new Error('翻译出错')
    }

    const detectLang = result.data.detect.detect
    if (detectLang === tl && detectLang === store.config[PROVIDER.SOUGOU_TRANSLATE].targetLanguage) {
      return this.translate(word, {
        sl,
        tl: store.config[PROVIDER.SOUGOU_TRANSLATE].secondTargetLanguage,
      })
    }

    const translateData = result.data.translate.dit.split('\n')

    return () => {
      containerData.data = translateData
      containerData.inputText = word
      containerData.sourceLanguage = sl
      containerData.targetLanguage = tl
      containerData.detectedLanguage = detectLang
    }
  }

  private async handlePlay(params: PlayAudioPayload) {
    const volume = 0.7
    const query = {
      text: params.word,
      speed: 1,
      lang: params.tl,
      from: 'translateweb',
    }
    const url = `https://fanyi.sogou.com/reventondc/synthesis?${querystring.stringify(query)}`


    if (audioCacheService.play(url, volume)) {
      return
    }

    const response = await got<ArrayBuffer>({
      method: 'GET',
      headers: {
        'Referer': 'https://fanyi.sogou.com/',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'upgrade-insecure-requests': '1',
      },
      responseType: 'arraybuffer',
      url,
      timeout: 5000,
    })

    audioCacheService.play(url, response.response, volume)
  }
}

export default new SougouTranslateProvider()
