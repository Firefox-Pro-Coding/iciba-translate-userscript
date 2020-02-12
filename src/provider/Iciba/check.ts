import { PathReporter } from 'io-ts/lib/PathReporter'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import copy from '~/util/copy'
import { codec } from './types'
import { PROVIDER } from '~/constants/constant'
import { got } from '~/util/gmapi'

export default (data: any, word: string) => {
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
        provider: PROVIDER.ICIBA,
      }),
    })
  }

  console.log(c)
  if (isLeft(result)) {
    /* eslint-disable no-console, no-alert */
    alert('type error')
    console.log(result)
    console.log(PathReporter.report(result))
  }
}
