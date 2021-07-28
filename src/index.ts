/* eslint-disable import/no-unassigned-import, import/order */
import { shadowRoot } from './service/shadowRoot'
import { createApp, h } from 'vue'

import '~/util/extendIoTs/enum'
import '~/assets/styles/tailwind.sass'

import Ripple from './util/diretives/ripple'
import NoOverscroll from './util/diretives/no-overscroll'

import Checkbox from '~/components/checkbox/checkbox.vue'
import CheckboxLine from '~/components/checkboxLine/checkboxLine'
import RadioGroup from '~/components/radioGroup/radioGroup'
import Radio from '~/components/radio/radio.vue'
import Slider from '~/components/slider/slider.vue'
import HotkeyInput from '~/components/hotkeyInput/hotkeyInput.vue'
import IIcon from '~/components/IIcon/IIcon.vue'

import { initStore } from '~/service/store'
import { providers } from '~/provider'
import App from '~/App.vue'

const main = async () => {
  await initStore(providers)

  const style = document.createElement('style')
  style.innerHTML = '.iciba-root{all:initial}'
  document.head.appendChild(style)

  const app = createApp({
    render() {
      return h(App)
    },
  })

  app.directive('ripple', Ripple)
  app.directive('no-overscroll', NoOverscroll)

  app.component('i-checkbox-line', CheckboxLine)
  app.component('i-checkbox', Checkbox)
  app.component('i-radio-group', RadioGroup)
  app.component('i-radio', Radio)
  app.component('i-slider', Slider)
  app.component('i-hotkey-input', HotkeyInput)
  app.component('i-icon', IIcon)

  const appRoot = document.createElement('div')
  shadowRoot.appendChild(appRoot)
  app.mount(appRoot)
}

main()
