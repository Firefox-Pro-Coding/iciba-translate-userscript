import Vue from 'vue'

/* eslint-disable camelcase */
import type_1_translate_281759 from '~/src/assets/img/googleTranslate/type_1_translate_281759.svg'
import type_2_translate_281776 from '~/src/assets/img/googleTranslate/type_2_translate_281776.svg'
import type_2_translate_324121 from '~/src/assets/img/googleTranslate/type_2_translate_324121.svg'
import type_3_google_814137 from '~/src/assets/img/googleTranslate/type_3_google_814137.svg'
/* eslint-enable camelcase */
import AbstractTranslateProvider from '../AbstractTranslateProvider'

// import icibaContainer from './container/icibaContainer.vue'

class GoogleTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'GoogleTranslate'
  public settingDescriptor = []
  public containerComponentClass = Vue.extend({ name: 'GoogleTranslateContainer' })

  public constructor() {
    super()
    this.icons = [
      /* eslint-disable camelcase */
      type_1_translate_281759,
      type_2_translate_281776,
      type_2_translate_324121,
      type_3_google_814137,
      /* eslint-enable camelcase */
    ].map(icon => AbstractTranslateProvider.createIcon(icon))
  }

  public async translate(word: string) {
    return Promise.resolve()
  }
}

export default GoogleTranslateProvider
