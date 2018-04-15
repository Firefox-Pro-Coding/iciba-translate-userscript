import Vue from 'vue'

import iconBase64 from '~/src/assets/img/baidu.svg'
import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider, {
  ITranslateProviderSetting,
} from '../AbstractTranslateProvider'

// import icibaContainer from './container/icibaContainer.vue'

class IcibaTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'baiduTranslate'
  public icon = `data:image/svg+xml;base64,${window.btoa(iconBase64)}`
  public settingDescripter = []
  public containerComponent = new Vue({
    // el: document.createElement('div'),
    // template: '<iciba-container></iciba-container>',
    // components: {
    //   icibaContainer,
    // },
  })

  public getSetting(): ITranslateProviderSetting {
    return []
  }

  public loadSetting(settings: ITranslateProviderSetting) {
    // nothing to do
  }

  public async translate(word: string) {
    let result
    try {
      result = await got({
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Host': 'open.iciba.com',
          'Pragma': 'no-cache',
          'Referer': 'http://www.iciba.com/',
          'User-Agent': window.navigator.userAgent,
        },
        url: `http://open.iciba.com/huaci/dict.php?word=${encodeURIComponent(word)}`,
        timeout: 10000,
      })
    } catch (e) {
      return Promise.reject(e)
    }

    // remove escape
    const text = result.replace(/\\/g, '')
    const match = text.match(/dict\.innerHTML='(.*)'/)
    if (!match) {
      throw new Error('解析出错！')
    }
    const html = match[1]
    return html

    // if (engine === 'iciba') {
    //   let iciba_result = await get_iciba_result(word)
    //   _this.icibaResultTextBox.innerHTML = iciba_result
    //   let playbtn = document.querySelectorAll('.icIBahyI-ico_sound')
    //   if (playbtn.length != 0) {
    //     for (let i = 0; i < playbtn.length; i++) {
          // playbtn[i].setAttribute(
          //   'mp3',
          //   playbtn[i].getAttribute('onclick').match(/asplay_hanci\('(.*)'\)/)[1]
          // )
    //       playbtn[i].removeAttribute('onclick')
    //       playbtn[i].addEventListener('click', _this.playSound, false)
    //     }
    //   }
    // }
  }
}

export default IcibaTranslateProvider
