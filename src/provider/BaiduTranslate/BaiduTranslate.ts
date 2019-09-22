import querystring from 'querystring'

import { BaiduTranslatePayload } from '~/bus/bus'
import { PROVIDER } from '~/constants/constant'
import { BAIDU_LANGUAGES } from '~/constants/baiduLanguages'
import store from '~/store'
import { got } from '~/util/gmapi'
import playAudio from '~/util/playAudio'
import { AudioCache } from '~/types'


import AbstractTranslateProvider from '../AbstractTranslateProvider'
import getToken from './helpers/token'
import BaiduTranslateContainer from './container/BaiduTranslateContainer.vue'
import containerData from './containerData'
import BaiduTranslateBus, { PlayAudioPayload } from './bus'

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.BAIDU_TRANSLATE
  public settingDescriptor = []
  public containerComponentClass = BaiduTranslateContainer

  private audioCache: AudioCache = {}

  public constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
    BaiduTranslateBus.on(BaiduTranslateBus.events.PLAY_AUDIO, this.handlePlay)
  }

  public async translate(word: string, payload?: BaiduTranslatePayload) {
    const auto = !payload || payload.sl === 'auto'
    const sl = !payload || auto ? await this.detectLang(word) : payload.sl
    // eslint-disable-next-line no-nested-ternary
    const tl = payload
      ? payload.tl
      : store.config[PROVIDER.BAIDU_TRANSLATE].targetLanguage !== sl
        ? store.config[PROVIDER.BAIDU_TRANSLATE].targetLanguage
        : store.config[PROVIDER.BAIDU_TRANSLATE].secondTargetLanguage

    const result = await this.fetchTranslation({ word, sl, tl })
    return () => {
      containerData.data = result
      containerData.inputText = word
      containerData.autoMode = auto
      containerData.sourceLanguage = sl
      containerData.targetLanguage = tl
    }
  }

  private async detectLang(word: string): Promise<BAIDU_LANGUAGES> {
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
      data: querystring.stringify(formdata),
      timeout: 5000,
    })
    const result = JSON.parse(response.responseText)
    if (result.error === 0) {
      return result.lan
    }
    throw new Error('检测翻译文本语言失败！')
  }

  private async fetchTranslation({ word, sl, tl }: { word: string, sl: string, tl: string }) {
    let token
    try {
      token = await getToken(word)
    } catch (e) {
      token = await getToken(word, true)
    }

    const query = {
      from: sl,
      to: tl,
      query: word,
      transtype: 'translang',
      simple_means_flag: 3,
      sign: token.sign,
      token: token.token,
    }

    const response = await got({
      method: 'POST',
      headers: {
        'referer': 'https://fanyi.baidu.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': window.navigator.userAgent,
      },
      url: 'https://fanyi.baidu.com/v2transapi',
      data: querystring.stringify(query),
      timeout: 5000,
    })

    const result = JSON.parse(response.responseText)

    if (result.trans_result && result.trans_result.type === 2 && result.trans_result.status === 0) {
      return result.trans_result.data.map((v: any) => v.dst) as Array<string>
    }
    throw new Error('翻译出错！')
  }

  private async handlePlay(params: PlayAudioPayload) {
    const volume = 0.7
    const query = {
      lan: params.tl,
      text: params.word,
      spd: params.tl === 'zh' ? 5 : 3,
      source: 'web',
    }
    const url = `https://fanyi.baidu.com/gettts?${querystring.stringify(query)}`

    if (url in this.audioCache) {
      playAudio(this.audioCache[url], volume)
      return
    }

    const response = await got({
      method: 'GET',
      headers: {
        'Referer': 'https://fanyi.baidu.com/',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'upgrade-insecure-requests': '1',
      },
      responseType: 'arraybuffer',
      url,
      timeout: 5000,
    })

    const arrayBuffer = response.response
    this.audioCache[url] = arrayBuffer
    playAudio(arrayBuffer, volume)
  }
}

export default new BaiduTranslateProvider()
