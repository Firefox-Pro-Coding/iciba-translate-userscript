import { PathReporter } from 'io-ts/lib/PathReporter'
import { isLeft } from 'fp-ts/lib/Either'
import copy from '~/util/copy'
import { UrbanDictionaryResult, urbanDictionaryResult } from '.'

export const check = (data: UrbanDictionaryResult) => {
  const c = copy(data)
  const result = urbanDictionaryResult.decode(c)

  /* eslint-disable no-console, no-alert */
  console.log(c)
  if (isLeft(result)) {
    alert('type error')
    console.log(c)
    console.log(result)
    console.log(PathReporter.report(result))
  }
}
