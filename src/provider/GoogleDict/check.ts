import { PathReporter } from 'io-ts/lib/PathReporter'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import copy from '~/util/copy'
import { codec, Codec } from './types'
import { got } from '~/util/gmapi'
import { PROVIDER } from '~/constants/constant'

export default (data: Codec, word: string) => {
  const c = copy(data)
  const result = codec.decode(c)

  if (isRight(result)) {
    got({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'http://127.0.0.1:56800/iciba/result',
      timeout: 10000,
      data: JSON.stringify({
        result: JSON.stringify(c),
        word,
        provider: PROVIDER.GOOGLE_DICT,
      }),
    })
  }

  /* eslint-disable no-console, no-alert */
  console.log(c)
  if (isLeft(result)) {
    alert('type error')
    console.log(c)
    console.log(result)
    console.log(PathReporter.report(result))
  }
}
