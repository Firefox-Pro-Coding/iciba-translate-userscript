import { stringify } from 'querystring'
import { PROVIDER } from '~/constants/constant'
import { BAIDU_LANGUAGES } from '~/constants/baiduLanguages'
import { store } from '~/service/store'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'
import { got } from '~/util/gmapi'

import { ProviderType } from '../provider'
import getToken from './helpers/token'
import BaiduTranslateContainer from './container/BaiduTranslateContainer.vue'
import containerData from './containerData'

export interface BaiduTranslateParams {
  sl: string
  tl: string
}

const useBaiduTranslateProvider = (): ProviderType => {
  const detectLang = async (word: string): Promise<BAIDU_LANGUAGES> => {
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
      data: stringify(formdata),
      timeout: 5000,
    })
    const result = JSON.parse(response.responseText)
    if (result.error === 0) {
      return result.lan
    }
    throw new Error('检测翻译文本语言失败！')
  }

  const fetchTranslation = async ({ word, sl, tl }: { word: string, sl: string, tl: string }) => {
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
      data: stringify(query),
      timeout: 5000,
    })

    const result = JSON.parse(response.responseText)

    if (result.trans_result && result.trans_result.type === 2 && result.trans_result.status === 0) {
      return result.trans_result.data.map((v: any) => v.dst) as Array<string>
    }
    throw new Error('翻译出错！')
  }

  const translate = async (word: string, payload?: BaiduTranslateParams) => {
    const auto = !payload || payload.sl === 'auto'
    const sl = !payload || auto ? await detectLang(word) : payload.sl
    // eslint-disable-next-line no-nested-ternary
    const tl = payload
      ? payload.tl
      : store.config[PROVIDER.BAIDU_TRANSLATE].targetLanguage !== sl
        ? store.config[PROVIDER.BAIDU_TRANSLATE].targetLanguage
        : store.config[PROVIDER.BAIDU_TRANSLATE].secondTargetLanguage

    const result = await fetchTranslation({ word, sl, tl })
    return () => {
      containerData.data = result
      containerData.inputText = word
      containerData.autoMode = auto
      containerData.sourceLanguage = sl
      containerData.targetLanguage = tl
    }
  }

  const handlePlay = async (payload: PlayAudioAction) => {
    if (payload.id !== PROVIDER.BAIDU_TRANSLATE) {
      return
    }
    const params = payload.params
    const volume = 0.7
    const query = {
      lan: params.tl,
      text: params.word,
      spd: params.tl === 'zh' ? 5 : 3,
      source: 'web',
    }
    const url = `https://fanyi.baidu.com/gettts?${stringify(query)}`

    if (audioCacheService.play(url, volume)) {
      return
    }

    const response = await got<ArrayBuffer>({
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

    audioCacheService.play(url, response.response, volume)
  }

  audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)
  return {
    id: PROVIDER.BAIDU_TRANSLATE,
    view: BaiduTranslateContainer,
    translate,
  }
}

export const baiduTranslate = useBaiduTranslateProvider()
