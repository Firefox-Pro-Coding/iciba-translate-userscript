import Vue from 'vue'

import iconBase64 from '~/src/assets/img/baiduTranslate/baidu.svg'
// import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'

// import icibaContainer from './container/icibaContainer.vue'

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'BaiduTranslate'
  public settingDescriptor = []
  public containerComponent = new Vue({})

  public constructor() {
    super()
    this.icons = [
      iconBase64,
    ].map(icon => AbstractTranslateProvider.createIcon(icon))
  }

  public async translate(word: string) {
    return Promise.resolve()
  }
}

export default BaiduTranslateProvider
