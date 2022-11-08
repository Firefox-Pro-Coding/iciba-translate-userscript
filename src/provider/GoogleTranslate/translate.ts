import { isLeft, left, right } from 'fp-ts/lib/Either'

import { got } from '~/util/gmapi'

import containerData from './container/data'
import { GetGoogleTranslateResult } from './types'
import { store } from './store'

export interface GoogleTranslateParams {
  word: string
  payload?: {
    sl?: string
    tl?: string
    fromDict?: boolean
  }
}

const getGoogleTranslateResult = async (p: GoogleTranslateParams) => {
  const sourceLanguage = p.payload?.sl ?? 'auto'
  const targetLanguage = p.payload?.tl ?? store.data.targetLanguage

  const req = JSON.stringify([[[
    'MkEWBc',
    JSON.stringify([
      [p.word, sourceLanguage, targetLanguage, true],
      [null],
    ]),
    null,
    'generic',
  ]]])

  const apiDomain = 'translate.google.com'

  const doRequest = async (getToken = false) => {
    const result = await got<any>({
      url: `https://${apiDomain}/_/TranslateWebserverUi/data/batchexecute`,
      method: 'POST',
      headers: {
        'Referer': `https://${apiDomain}/`,
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: new URLSearchParams({
        'f.req': req,
        ...getToken ? {} : {
          at: store.data.xsrfToken,
        },
      }).toString(),
      timeout: 5000,
      // responseType: '', // force auto json parse
    } as any)

    if (isLeft(result)) {
      const body = JSON.parse(result.left.res.responseText.substring(4)) as Array<any>
      const err = body.find((v) => v && v[0] === 'er') as Array<any>
      const errDetail = err[4] as Array<any>
      if (errDetail && errDetail[0] === 'xsrf') {
        const xsrfToken = errDetail[1] as string
        store.data.xsrfToken = xsrfToken
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
    // eslint-disable-next-line
    translate: data[1][0][0][5].map((v: any) => ({
      text: v[0] as string,
      variations: v[1] as Array<string>,
    })),
    translatePhonetics: data[1][0][0][1] as string,
    fromDict: !!p.payload?.fromDict,
  }

  return o
}


export const translate = async (p: GoogleTranslateParams) => {
  try {
    let data = await getGoogleTranslateResult(p)

    // autodetected and fallback to secondTargetLanguage
    if (!p.payload && data.detectedLanguage === store.data.targetLanguage) {
      data = await getGoogleTranslateResult({
        ...p,
        payload: {
          ...p.payload ?? {},
          tl: store.data.secondTargetLanguage,
        },
      })
    }

    return right(() => {
      containerData.data = data
      containerData.inputText = p.word
    })
  } catch (e: any) {
    return left({
      message: e.message,
    })
  }
}
