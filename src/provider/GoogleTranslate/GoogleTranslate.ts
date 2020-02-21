import querystring from 'querystring'

import { PROVIDER, GOOGLE_TRANSLATE_HOST_MAP } from '~/constants/constant'
import { store } from '~/service/store'
import { GOOGLE_LANGUAGES } from '~/constants/googleLanguages'
import { got } from '~/util/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import getToken from './helpers/token'
import GoogleTranslateContainer from './container/GoogleTranslateContainer.vue'
import containerData from './containerData'
import GoogleTranslateBus, { PlayAudioPayload, NAMES } from './bus'
import { audioCacheService } from '~/service/audioCache'

export interface GoogleTranslateParams {
  sl?: string
  tl?: string
  fromDict?: boolean
}

interface GetGoogleTranslateResult {
  result: Array<string>
  sl: string
  tl: string
  dl: string
  fromDict: boolean
}

class GoogleTranslateProvider extends AbstractTranslateProvider {
  public static apiQuery = {
    client: 'webapp',
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
  public containerComponentClass = GoogleTranslateContainer

  public constructor() {
    super()

    // bind methods
    this.handlePlay = this.handlePlay.bind(this)
    GoogleTranslateBus.on(NAMES.PLAY_AUDIO, this.handlePlay)
  }

  public async translate(word: string, payload?: GoogleTranslateParams) {
    const data = await this.getGoogleTranslateResult(word, payload)
    return () => {
      containerData.data = data.result
      containerData.inputText = word
      containerData.detectedLanguage = data.dl as GOOGLE_LANGUAGES
      containerData.sourceLanguage = data.sl
      containerData.targetLanguage = data.tl as GOOGLE_LANGUAGES
      containerData.fromDict = data.fromDict
    }
  }

  private async getGoogleTranslateResult(word: string, payload?: GoogleTranslateParams): Promise<GetGoogleTranslateResult> {
    let token
    try {
      token = await getToken(word, this.getApiDomain())
    } catch (e) {
      throw new Error(`获取token失败！请检查网络。(${(e as Error).message})`)
    }

    const sl = payload?.sl ?? 'auto'
    const tl = payload?.tl ?? store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage

    const query = {
      ...GoogleTranslateProvider.apiQuery,
      sl,
      tl,
      hl: tl,
      tk: token,
      q: word,
    }

    const url = `https://${this.getApiDomain()}/translate_a/single?${querystring.stringify(query)}`

    const result = await got<any>({
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

    // autodetected and fallback to secondTargetLanguage
    if (
      !payload
        && detectedLanguage === tl
        && detectedLanguage === store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage
    ) {
      return this.getGoogleTranslateResult(word, {
        sl,
        tl: store.config[PROVIDER.GOOGLE_TRANSLATE].secondTargetLanguage,
      })
    }

    const translateResult = (data[0] as Array<Array<string>>)
      .map((v) => (v[0] ? v[0] : ''))
      .filter(Boolean)
      .flatMap((v) => v.split('\n'))

    return {
      result: translateResult,
      sl,
      tl,
      dl: detectedLanguage,
      fromDict: payload?.fromDict ?? false,
    }
  }

  private getApiDomain() {
    return GOOGLE_TRANSLATE_HOST_MAP[store.config[PROVIDER.GOOGLE_TRANSLATE].translateHost]
  }

  private async handlePlay(params: PlayAudioPayload) {
    const volume = 0.8
    const query = {
      ie: 'UTF-8',
      total: '1',
      idx: '0',
      client: 'webapp',
      prev: 'input',
      q: params.word,
      tl: params.tl,
      textlen: params.word.length,
      tk: await getToken(params.word, this.getApiDomain()),
    }
    const url = `https://${this.getApiDomain()}/translate_tts?${querystring.stringify(query)}`

    if (audioCacheService.play(url, volume)) {
      return
    }

    const response = await got<ArrayBuffer>({
      method: 'GET',
      headers: {
        'Referer': `https://${this.getApiDomain()}/`,
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

export default new GoogleTranslateProvider()
