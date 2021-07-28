import { isRight } from 'fp-ts/lib/These'
import { audioCacheService } from '~/service/audioCache'
import { got } from '~/util/gmapi'

export const playAudio = async (url: string): Promise<void> => {
  if (!url) {
    return
  }

  const volume = 0.6

  if (audioCacheService.has(url)) {
    audioCacheService.play(url, volume)
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
