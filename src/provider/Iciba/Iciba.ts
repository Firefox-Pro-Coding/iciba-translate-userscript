import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants/constant'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'

import { ProviderType } from '../provider'
import IcibaContainer from './container/IcibaContainer.vue'
import containerData from './containerData'

const useIcibaProvider = (): ProviderType => {
  const translate = async (word: string) => {
    const apiUrl = `http://www.iciba.com/word?w=${encodeURIComponent(word)}`

    const response = await got({
      method: 'GET',
      url: apiUrl,
      timeout: 5000,
    })
    const content = response.responseText
    const contentMatch = /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/.exec(content)

    if (!contentMatch) {
      return Promise.reject(new Error('数据错误！'))
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
      check(result, word)
    }

    return () => {
      containerData.data = copy(result)
    }
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
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.iciba.com/',
        'User-Agent': window.navigator.userAgent,
      },
      responseType: 'arraybuffer',
      url,
      timeout: 5000,
    })
    audioCacheService.play(url, response.response, volume)
  }

  audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)

  return {
    id: PROVIDER.ICIBA,
    view: IcibaContainer,
    translate,
  }
}

export const iciba = useIcibaProvider()
