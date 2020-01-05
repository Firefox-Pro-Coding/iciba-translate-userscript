// https://github.com/matheuss/google-translate-token
/**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 */

import { got } from '~/util/gmapi'

let data: Token | null = null

interface Token {
  ig: string
  iid: string
}
const getToken = () => {
  if (data) {
    return data
  }

  return got({
    method: 'GET',
    url: 'https://cn.bing.com/Translator',
  }).then((res) => {
    if (!res) {
      throw new Error('网络错误！')
    }
    const iidMatch = /data-iid="(.+?)"/.exec(res.responseText)
    const igMatch = /IG:"(.+?)"/.exec(res.responseText)
    if (!iidMatch || !igMatch) {
      throw new Error('获取 token 失败！')
    }

    data = {
      iid: iidMatch[1],
      ig: igMatch[1],
    }
    return data
  })
}

export default getToken
