import { PathReporter } from 'io-ts/lib/PathReporter'
import { isLeft } from 'fp-ts/lib/Either'
import copy from '~/util/copy'
import { codec, Codec } from './types'

export default (data: Codec) => {
  const c = copy(data)
  const result = codec.decode(c)

  /* eslint-disable no-console, no-alert */
  console.log(c)
  if (isLeft(result)) {
    alert('type error')
    console.log(c)
    console.log(result)
    console.log(PathReporter.report(result))
  }
}
