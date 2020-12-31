import { isLeft, isRight, left, right } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'

import { ProviderType } from '../provider'
import { containerData } from './containerData'
import IcibaContainer from './container/IcibaContainer.vue'

const translate: ProviderType['translate'] = async (word: string) => {
  const apiUrl = `http://www.iciba.com/word?w=${encodeURIComponent(word)}`

  const response = await got({
    method: 'GET',
    url: apiUrl,
    timeout: 5000,
  })
  if (isLeft(response)) {
    throw new Error(response.left.type)
  }
  const content = response.right.responseText
  const contentMatch = /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/.exec(content)

  if (!contentMatch) {
    return left({
      message: '数据错误！',
    })
  }
  const resultJson = JSON.parse(contentMatch[1])
  const result = resultJson.props.initialDvaState.word.wordInfo

  // fix iciba api typo
  if ('baesInfo' in result) {
    result.baseInfo = result.baesInfo
    delete result.baesInfo
  }

  if ('bidce' in result) {
    result.bidec = result.bidce
    delete result.bidce
  }

  // dev only check
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const check = require('./check').default as (...args: Array<any>) => unknown
    check(result)
  }

  return right(() => {
    containerData.data = copy(result)
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
