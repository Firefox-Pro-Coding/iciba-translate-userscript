import { stringify } from 'querystring'
import { isRight } from 'fp-ts/lib/Either'
import { audioCacheService } from '~/service/audioCache'
import { got } from '~/util/gmapi'


export const playAudio = async (word: string, tl: string) => {
  const volume = 0.7
  const query = {
    lan: tl,
    text: word,
    spd: tl === 'zh' ? 5 : 3,
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

  if (isRight(response)) {
    audioCacheService.play(url, response.right.response, volume)
  }
}
