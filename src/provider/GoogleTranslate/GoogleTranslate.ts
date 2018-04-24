import Vue from 'vue'

import iconBase64 from '~/src/assets/img/google.svg'
// import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider, {
  ITranslateProviderSetting,
} from '../AbstractTranslateProvider'

// import icibaContainer from './container/icibaContainer.vue'

class IcibaTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'googleCNTranslate'
  public icon = iconBase64
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
    return Promise.resolve()
  }
}

export default IcibaTranslateProvider
