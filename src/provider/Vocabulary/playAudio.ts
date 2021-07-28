import { isRight } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import { audioCacheService } from '~/service/audioCache'

/*
https://audio.vocab.com/1.0/us/B/RQGAHF8JUGF9.mp3
https://audio.vocab.com/1.0/us/${data-audio}.mp3
*/
export const playAudio = async (key: string): Promise<void> => {
  if (!key) {
    return
  }
  const url = `https://audio.vocab.com/1.0/us/${key}.mp3`
  const volume = 0.65

  if (audioCacheService.play(url, volume)) {
    return
  }

  const response = await got<ArrayBuffer>({
    method: 'GET',
    headers: {
      Referer: 'https://www.vocabulary.com',
    },
    responseType: 'arraybuffer',
    url,
    timeout: 5000,
  })

  if (isRight(response)) {
    audioCacheService.play(url, response.right.response, volume)
  }
}
