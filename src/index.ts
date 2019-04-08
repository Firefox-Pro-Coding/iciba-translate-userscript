/* eslint-disable import/first */
/* tslint:disable:no-import-side-effect */
import '~/util/extendIoTs'

// eslint-disable-next-line import/order
import { shadowRoot } from './createRoot'

import Vue from 'vue'
import App from '~/App.vue'
import store from '~/store'

import './vuetify'

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
