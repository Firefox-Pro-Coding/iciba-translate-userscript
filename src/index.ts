/* eslint-disable import/no-unassigned-import, import/order */
import Vue from 'vue'
import { shadowRoot } from './service/shadowRoot'

import './bootstrap'
import '~/util/extendIoTs/enum'
import '~/plugin/prototype'
import '~/service'

import App from '~/App.vue'
import { store } from '~/service/store'

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
