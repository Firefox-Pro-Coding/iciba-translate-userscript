import { PathReporter } from 'io-ts/lib/PathReporter'
import { isLeft } from 'fp-ts/lib/Either'
import copy from '~/util/copy'
import { codec } from './types'

export default (data: any) => {
  const c = copy(data)
  const result = codec.decode(c)

  /* eslint-disable no-console, no-alert */
  console.log(c)
  if (isLeft(result)) {
    alert('type error')
    console.log(result)
    console.log(PathReporter.report(result))
  }
}
