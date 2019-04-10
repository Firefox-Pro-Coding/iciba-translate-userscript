/* eslint-disable import/first */
/* tslint:disable:no-import-side-effect */
import { shadowRoot } from './createRoot'

import '~/util/extendIoTs'
import '~/plugin/toast/toastPlugin'
import './vuetify'

import Vue from 'vue'
import App from '~/App.vue'
import store from '~/store'


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
