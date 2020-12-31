/**
 * https://www.jianshu.com/p/2c333f7ae1c2
 * https://www.jianshu.com/p/38a65d8d3e80
 */

import { isLeft } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import calcToken from './calcToken'

let commonToken = '0'
let gtk = ''

const updateGTK = async (force?: boolean) => {
  if (!force && gtk) {
    return
  }

  const response = await got({
    method: 'GET',
    url: 'https://fanyi.baidu.com/',
    timeout: 5000,
  })
  if (isLeft(response)) {
    throw new Error(response.left.type)
  }

  const responseText = response.right.responseText
  const gtkMatch = /window\.gtk = '(.*?)'/.exec(responseText)
  const commonTokenMatch = /token: '(.*?)',/.exec(responseText)

  if (!gtkMatch) {
    throw new Error('failed to get gtk')
  }
  if (!commonTokenMatch) {
    throw new Error('failed to get common token')
  }

  const newGtk = gtkMatch[1]
  const newCommonToken = commonTokenMatch[1]

  if (typeof newGtk !== 'undefined') {
    gtk = newGtk
  }
  if (typeof newCommonToken !== 'undefined') {
    commonToken = newCommonToken
  }
}

const getToken = async (word: string, force?: boolean) => {
  await updateGTK(force)
  const token = calcToken(word, gtk)
  return { sign: token, token: commonToken }
}

export default getToken
