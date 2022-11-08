import { isLeft, isRight, left, right } from 'fp-ts/lib/Either'
import { decode } from 'base64-arraybuffer'

import { audioCacheService } from '~/service/audioCache'
import { got } from '~/util/gmapi'

import { GoogleTranslateProvider } from '.'

export const playAudio = async (word: string, tl: string) => {
  const volume = 0.8
  const req = JSON.stringify([[[
    'jQ1olc',
    JSON.stringify([
      word,
      tl,
      // null: normal speed; true: slow mode
      null,
      'null',
    ]),
    null,
    'generic',
  ]]])

  const doRequest = async (getToken = false) => {
    const apiDomain = 'translate.google.com'

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
          at: GoogleTranslateProvider.store.xsrfToken,
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
        GoogleTranslateProvider.store.xsrfToken = xsrfToken
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
      `googletranslatetts-${word}-${tl}`,
      audioBuffer,
      volume,
    )
  }
}
