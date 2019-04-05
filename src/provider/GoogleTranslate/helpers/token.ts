// https://github.com/matheuss/google-translate-token
/**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 */

import { got } from '~/src/util/gmapi'
import calcToken from './calcToken'

// var config = new Configstore('google-translate-api');
//
// const window = {
//   TKK: config.get('TKK') || '0'
// }

let googleTranslateTKK = '0'

const updateTKK = async () => {
  const now = Math.floor(Date.now() / 3600000)
  if (Number(googleTranslateTKK.split('.')[0]) === now) {
    return
  }
  const result = await got({
    method: 'GET',
    url: 'https://translate.google.com',
    timeout: 5000,
  })
  const match = result.responseText.match(/tkk:'(.*?)'/)

  if (!match) {
    throw new Error('failed to get ttk')
  }

  const TKK = match[1]

  if (typeof TKK !== 'undefined') {
    googleTranslateTKK = TKK
  }
}

const getToken = async (word: string) => {
  await updateTKK()
  const token = calcToken(word, googleTranslateTKK)
  return token
}

export default getToken
