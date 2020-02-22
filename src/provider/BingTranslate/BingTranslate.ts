import { stringify } from 'querystring'
import { PROVIDER } from '~/constants/constant'
import { BING_LANGUAGES, BING_VOICE_MAP } from '~/constants/bingLanguages'
import { got } from '~/util/gmapi'
import { store } from '~/service/store'
import { audioCacheService } from '~/service/audioCache'

import { ProviderType } from '../provider'
import BingTranslateContainer from './container/BingTranslateContainer.vue'
import containerData from './containerData'
import getToken from './helpers/token'
import getVoiceToken from './helpers/voiceToken'
import BingTranslateBus, { PlayAudioPayload, NAMES } from './bus'

interface BingTranslateResult {
  result: Array<string>
  sl: string
  tl: string
  dl: string
}

export interface BingTranslateParams {
  sl: string
  tl: string
}
const useBingTranslateProvider = (): ProviderType => {
  let un = 1

  const getBingTranslate = async (word: string, payload?: BingTranslateParams): Promise<BingTranslateResult> => {
    const sl = payload
      ? payload.sl
      : 'auto-detect'
    const tl = payload
      ? payload.tl
      : store.config[PROVIDER.BING_TRANSLATE].targetLanguage

    const token = await getToken()
    const body = stringify({
      text: word,
      fromLang: sl,
      to: tl,
    })
    const query = stringify({
      isVertical: '1',
      IG: token.ig,
      IID: `${token.iid}.${un}`,
    })

    un += 1

    const url = `https://cn.bing.com/ttranslatev3?${query}`

    const result = await got<any>({
      method: 'POST',
      url,
      data: body,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        origin: 'https://cn.bing.com',
        referer: 'https://cn.bing.com/Translator',
      },
      responseType: 'json',
    })

    const data = result.response[0]
    const detectedLanguage: string = data.detectedLanguage.language

    // autodetected and fallback to secondTargetLanguage
    if (
      !payload
        && detectedLanguage === tl
        && detectedLanguage === store.config[PROVIDER.BING_TRANSLATE].targetLanguage
    ) {
      return getBingTranslate(word, {
        sl,
        tl: store.config[PROVIDER.BING_TRANSLATE].secondTargetLanguage,
      })
    }

    const translation = data.translations[0].text.split('\n')
    return {
      result: translation,
      sl,
      tl,
      dl: detectedLanguage,
    }
  }

  const translate = async (word: string, payload?: BingTranslateParams) => {
    const data = await getBingTranslate(word, payload)
    return () => {
      containerData.data = data.result
      containerData.inputText = word
      containerData.detectedLanguage = data.dl as BING_LANGUAGES
      containerData.sourceLanguage = data.sl
      containerData.targetLanguage = data.tl as BING_LANGUAGES
    }
  }

  const handlePlay = async (params: PlayAudioPayload) => {
    const volume = 0.7
    const word = params.word.slice(0, 100)
    const key = `${params.tl}-${word}`
    const namespacedKey = `bing-translate-${key}`

    if (word.includes(']]>')) {
      return
    }

    if (audioCacheService.play(namespacedKey, volume)) {
      return
    }

    const token = await getToken()
    const voiceToken = await getVoiceToken(token.ig, token.iid)

    const voiceItem = BING_VOICE_MAP[params.tl as keyof typeof BING_VOICE_MAP]
    if (!voiceItem) {
      return
    }
    const [locale, gender, voiceName] = voiceItem
    const rate = '-10.00%' // 'default'
    const url = `https://${voiceToken.region}.tts.speech.microsoft.com/cognitiveservices/v1`
    const body = `<speak version="1.0" xml:lang="${locale}"><voice xml:lang="${locale}" xml:gender="${gender}" name="${voiceName}"><prosody rate="${rate}"><![CDATA[${word}]]></prosody></voice></speak>`
    const response = await got<ArrayBuffer>({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${voiceToken.token}`,
        'X-MICROSOFT-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/ssml+xml',
      },
      responseType: 'arraybuffer',
      url,
      data: body,
      timeout: 5000,
    })

    audioCacheService.play(namespacedKey, response.response, volume)
  }

  BingTranslateBus.on(NAMES.PLAY_AUDIO, handlePlay)

  return {
    id: PROVIDER.BING_TRANSLATE,
    view: BingTranslateContainer,
    translate,
  }
}

export const bingTranslate = useBingTranslateProvider()
