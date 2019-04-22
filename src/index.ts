/* eslint-disable import/first */
/* tslint:disable:no-import-side-effect */
import { shadowRoot } from './createRoot'

import '~/util/extendIoTs'
import '~/plugin/toast/toastPlugin'
import '~/style/genStyle'

import Vue from 'vue'
import App from '~/App.vue'
import store from '~/store'

import Ripple from './util/ripple'

import Checkbox from '~/components/SettingPage/components/checkbox/checkbox.vue'
import RadioGroup from '~/components/SettingPage/components/radioGroup/radioGroup.vue'
import Radio from '~/components/SettingPage/components/radio/radio.vue'
import Slider from '~/components/SettingPage/components/slider/slider.vue'

Vue.directive('ripple', Ripple)

Vue.component('i-checkbox', Checkbox)
Vue.component('i-radio-group', RadioGroup)
Vue.component('i-radio', Radio)
Vue.component('i-slider', Slider)

const main = async () => {
  await store.loadConfig()

  const app = new Vue({
    render(h) {
      return h('app')
    },
    components: {
      App,
    },
  })

  const appRoot = document.createElement('div')
  shadowRoot.appendChild(appRoot)
  app.$mount(appRoot)
}

main()
