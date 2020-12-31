import { stringify } from 'querystring'
import { isLeft, isRight, left, right } from 'fp-ts/lib/Either'
import { decode } from 'base64-arraybuffer'

import { PROVIDER, GOOGLE_TRANSLATE_HOST_MAP } from '~/constants'
import { store } from '~/service/store'
import { audioCacheService } from '~/service/audioCache'
import { got } from '~/util/gmapi'

import { ProviderType } from '../provider'
import GoogleTranslateContainer from './container/GoogleTranslateContainer.vue'
import containerData from './containerData'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'
import { GetGoogleTranslateResult } from './types'

export interface GoogleTranslateParams {
  sl?: string
  tl?: string
  fromDict?: boolean
}

const getApiDomain = () => GOOGLE_TRANSLATE_HOST_MAP[
  store.config[PROVIDER.GOOGLE_TRANSLATE].translateHost
]

const getGoogleTranslateResult = async (word: string, payload?: GoogleTranslateParams) => {
  const sourceLanguage = payload?.sl ?? 'auto'
  const targetLanguage = payload?.tl ?? store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage

  const req = JSON.stringify([[[
    'MkEWBc',
    JSON.stringify([
      [word, sourceLanguage, targetLanguage, true],
      [null],
    ]),
    null,
    'generic',
  ]]])

  const doRequest = async (getToken = false) => {
    const result = await got<any>({
      url: `https://${getApiDomain()}/_/TranslateWebserverUi/data/batchexecute`,
      method: 'POST',
      headers: {
        'Referer': `https://${getApiDomain()}/`,
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: stringify({
        'f.req': req,
        ...getToken ? {} : {
          at: store.config[PROVIDER.GOOGLE_TRANSLATE].xsrfToken,
        },
      }),
      timeout: 5000,
      // responseType: '', // force auto json parse
    } as any)

    if (isLeft(result)) {
      const body = JSON.parse(result.left.res.responseText.substring(4)) as Array<any>
      const err = body.find((v) => v && v[0] === 'er') as Array<any>
      const errDetail = err[4] as Array<any>
      if (errDetail && errDetail[0] === 'xsrf') {
        const xsrfToken = errDetail[1] as string
        store.config[PROVIDER.GOOGLE_TRANSLATE].xsrfToken = xsrfToken
        return left({
          type: 'xsrf',
          res: result.left.res,
        })
      }
      return left({
        type: result.left.type,
        res: result.left.res,
      })
    }

    const data = JSON.parse(result.right.responseText.substring(4))
    if (data[0]?.[1] === 'MkEWBc') {
      return right(JSON.parse(data[0][2]))
    }
    return left({
      type: 'unknown',
      res: result.right,
    })
  }

  let result = await doRequest()

  if (isLeft(result) && result.left.res.status === 400) {
    await doRequest(true)
    result = await doRequest()
  }

  if (isLeft(result)) {
    throw new Error(result.left.type)
  }

  const data = result.right

  const o: GetGoogleTranslateResult = {
    sourceLanguage,
    targetLanguage,
    detectedLanguage: (data[0][2] as string) || sourceLanguage,
    phon: data[0][0] as string | null,
    translate: data[1][0][0][5][0][0] as string,
    translatePhone: data[1][0][0][1] as string,
    translateVariations: data[1][0][0][5][0][1] as Array<string>,
    fromDict: !!payload?.fromDict,
  }

  return o
}

const translate: ProviderType['translate'] = async (word: string, payload?: GoogleTranslateParams) => {
  try {
    let data = await getGoogleTranslateResult(word, payload)

    // autodetected and fallback to secondTargetLanguage
    if (!payload && data.detectedLanguage === store.config[PROVIDER.GOOGLE_TRANSLATE].targetLanguage) {
      data = await getGoogleTranslateResult(word, {
        tl: store.config[PROVIDER.GOOGLE_TRANSLATE].secondTargetLanguage,
      })
    }

    return right(() => {
      containerData.data = data
      containerData.inputText = word
    })
  } catch (e) {
    return left({
      message: e.message,
    })
  }
}

const handlePlay = async (payload: PlayAudioAction) => {
  if (payload.id !== PROVIDER.GOOGLE_TRANSLATE) {
    return
  }
  const volume = 0.8
  const req = JSON.stringify([[[
    'jQ1olc',
    JSON.stringify([
      payload.params.word,
      payload.params.tl,
      // null: normal speed; true: slow mode
      null,
      'null',
    ]),
    null,
    'generic',
  ]]])

  const doRequest = async (getToken = false) => {
    const result = await got<any>({
      url: `https://${getApiDomain()}/_/TranslateWebserverUi/data/batchexecute`,
      method: 'POST',
      headers: {
        'Referer': `https://${getApiDomain()}/`,
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: stringify({
        'f.req': req,
        ...getToken ? {} : {
          at: store.config[PROVIDER.GOOGLE_TRANSLATE].xsrfToken,
        },
      }),
      timeout: 5000,
      // responseType: '', // force auto json parse
    } as any)

    if (isLeft(result)) {
      const body = JSON.parse(result.left.res.responseText.substring(4)) as Array<any>
      const err = body.find((v) => v && v[0] === 'er') as Array<any>
      const errDetail = err[4] as Array<any>
      if (errDetail && errDetail[0] === 'xsrf') {
        const xsrfToken = errDetail[1] as string
        store.config[PROVIDER.GOOGLE_TRANSLATE].xsrfToken = xsrfToken
        return left({
          type: 'xsrf',
          res: result.left.res,
        })
      }
      return left({
        type: result.left.type,
        res: result.left.res,
      })
    }

    const data = JSON.parse(result.right.responseText.substring(4))
    if (data[0]?.[1] === 'jQ1olc') {
      return right(JSON.parse(data[0][2]))
    }
    return left({
      type: 'unknown',
      res: result.right,
    })
  }

  let result = await doRequest()

  if (isLeft(result) && result.left.res.status === 400) {
    await doRequest(true)
    result = await doRequest()
  }

  if (isRight(result)) {
    const base64Data = result.right[0]
    const audioBuffer = decode(base64Data)
    audioCacheService.play(
      `googletranslatetts-${payload.params.word}-${payload.params.tl}`,
      audioBuffer,
      volume,
    )
  }
}

audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)

export const googleTranslate: ProviderType = {
  id: PROVIDER.GOOGLE_TRANSLATE,
  view: GoogleTranslateContainer,
  translate,
}
