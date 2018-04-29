import * as querystring from 'querystring'

import icibaIcon from '~/src/assets/img/iciba/search.svg'
import icibaIcon2 from '~/src/assets/img/iciba/search_214340.svg'
import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'

import IcibaContainer from './container/IcibaContainer.vue'

class IcibaTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'Iciba'
  public containerComponentClass = IcibaContainer
  public settingDescriptor = []

  public constructor() {
    super()
    this.icons = [
      icibaIcon,
      icibaIcon2,
    ].map(icon => AbstractTranslateProvider.createIcon(icon))
  }

  public async translate(word: string) {
    /*
    http://www.iciba.com/index.php?
    callback=jQuery190044530474284668253_1524231993263
    a=getWordMean
    c=search
    list=1%2C2%2C3%2C4%2C5%2C8%2C9%2C10%2C12%2C13%2C14%2C15%2C18%2C21%2C22%2C24%2C3003%2C3004%2C3005
    word=select
    _=1524231993264
    */
    const apiUrlBase = 'http://www.iciba.com/index.php?'
    const query = {
      callback: 'callbackFnName',
      a: 'getWordMean', // action ?
      c: 'search',
      // 可能是请求的数据列表
      // list: [1, 2, 3, 4, 5, 8, 9, 10, 12, 13, 14, 15, 18, 21, 22, 24, 3003, 3004, 3005]
      //   .join(','),
      list: [1].join(','),
      word,
      _: new Date().getTime(),
    }
    const apiUrl = `${apiUrlBase}${querystring.stringify(query)}`

    let result
    try {
      const response = await got({
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Host': 'www.iciba.com',
          'Pragma': 'no-cache',
          'Referer': `http://www.iciba.com`,
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': window.navigator.userAgent,
        },
        url: apiUrl,
        timeout: 10000,
      })
      const content = response.responseText
      const contentMatch = content.match(/callbackFnName\((.*)\)/)
      if (!contentMatch) {
        return Promise.reject(new Error('数据错误！'))
      }
      const resultJson = JSON.parse(contentMatch[1])
      result = resultJson
    } catch (e) {
      return Promise.reject(e)
    }

    // fix iciba api typo
    if ('baesInfo' in result) {
      result.baseInfo = result.baesInfo
      delete result.baesInfo
    }

    if (result.errno !== 0) {
      return Promise.reject(new Error(result.errmsg))
    }
    if (this.componentInstance === null) {
      return Promise.reject(new Error('查询结果挂载失败！'))
    }
    this.componentInstance.data = JSON.parse(JSON.stringify(result))
    return Promise.resolve()
  }
}

export default IcibaTranslateProvider
