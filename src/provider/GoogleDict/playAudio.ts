import { isRight } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import { audioCacheService } from '~/service/audioCache'


/** 播放音频 */
export const playAudio = async (url: string): Promise<void> => {
  const volume = 0.7
  const mp3Url = `https:${url}`

  if (audioCacheService.has(mp3Url)) {
    audioCacheService.play(mp3Url, volume)
    return
  }

  const response = await got<ArrayBuffer>({
    method: 'GET',
    headers: {
      // 'Accept': '*/*',
      // 'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
      // 'Cache-Control': 'no-cache',
      // 'Pragma': 'no-cache',
      'upgrade-insecure-requests': '1',
      // 'User-Agent': window.navigator.userAgent,
    },
    responseType: 'arraybuffer',
    url: mp3Url,
    timeout: 5000,
  })

  if (isRight(response)) {
    audioCacheService.play(mp3Url, response.right.response, volume)
  }
}
