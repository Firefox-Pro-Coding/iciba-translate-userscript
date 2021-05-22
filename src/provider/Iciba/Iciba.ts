import md5 from 'md5'
import { isLeft, isRight, left, right, tryCatch } from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'
import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'

import { ProviderType } from '../provider'
import { containerData } from './containerData'
import IcibaContainer from './container/IcibaContainer.vue'
import { store } from '~/service/store'

// e.params = {client: 6, key: 1000006, timestamp: 1611974079765, word: "lead"}
const translate: ProviderType['translate'] = async (rawWord: string) => {
  const now = Date.now()
  const wordCapital = store.config[PROVIDER.ICIBA].lowerCaseCapital
    ? rawWord.substring(0, 1).toLowerCase()
    : rawWord.substring(0, 1)
  const word = `${wordCapital}${rawWord.substring(1)}`
  // hard code in http://www.iciba.com/_next/static/chunks/8caea17ae752a5965491f530aed3596fce3ca5a9.f4f0c70d4f1b9d4253e3.js
  const hashKey = '7ece94d9f9c202b0d2ec557dg4r9bc'
  const hashMessageBody = `61000006${now}${word}`
  const hashMessage = `/dictionary/word/query/web${hashMessageBody}${hashKey}`
  const signature = md5(hashMessage)
  const query = [
    'client=6',
    'key=1000006',
    `timestamp=${now}`,
    `word=${encodeURIComponent(word)}`,
    `signature=${signature}`,
  ]
  const apiUrl = `https://dict.iciba.com/dictionary/word/query/web?${query.join('&')}`

  const response = await got({
    method: 'GET',
    url: apiUrl,
    timeout: 5000,
  })
  if (isLeft(response)) {
    throw new Error(response.left.type)
  }
  const content = response.right.responseText

  const result = tryCatch(
    () => JSON.parse(content).message as unknown,
    identity,
  )

  if (isLeft(result)) {
    return left({
      message: '数据错误！',
    })
  }

  const message = result.right as any

  // fix iciba api typo
  if ('baesInfo' in message) {
    message.baseInfo = message.baesInfo
    delete message.baesInfo
  }

  if ('bidce' in message) {
    message.bidec = message.bidce
    delete message.bidce
  }

  // dev only check
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const check = require('./check').default as (...args: Array<any>) => unknown
    check(message)
  }

  return right(() => {
    containerData.data = copy(message)
  })
}

const handlePlay = async (payload: PlayAudioAction): Promise<void> => {
  if (payload.id !== PROVIDER.ICIBA) {
    return
  }

  const url = payload.params.url
  if (!url) {
    return
  }

  const volume = 0.6

  if (audioCacheService.play(url, volume)) {
    return
  }

  const response = await got<ArrayBuffer>({
    method: 'GET',
    responseType: 'arraybuffer',
    url,
  })

  if (isRight(response)) {
    audioCacheService.play(url, response.right.response, volume)
  }
}

audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)

export const iciba: ProviderType = {
  id: PROVIDER.ICIBA,
  view: IcibaContainer,
  translate,
}
