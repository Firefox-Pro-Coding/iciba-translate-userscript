// https://github.com/matheuss/google-translate-token
/**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 */

import { isLeft } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'

let data: Token | null = null

interface Token {
  ig: string
  iid: string
}
const getToken = async () => {
  if (data) {
    return data
  }

  const res = await got({
    method: 'GET',
    url: 'https://cn.bing.com/Translator',
  })

  if (isLeft(res)) {
    throw new Error('网络错误！')
  }

  const iidMatch = /data-iid="(.+?)"/.exec(res.right.responseText)
  const igMatch = /IG:"(.+?)"/.exec(res.right.responseText)
  if (!iidMatch || !igMatch) {
    throw new Error('获取 token 失败！')
  }

  data = {
    iid: iidMatch[1],
    ig: igMatch[1],
  }

  return data
}

export default getToken
