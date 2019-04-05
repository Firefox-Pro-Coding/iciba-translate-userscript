/* eslint-disable import/first */
/* tslint:disable:no-import-side-effect */
import '~/util/extendIoTs'

// eslint-disable-next-line import/order
import { shadowRoot } from './createRoot'

import Vue from 'vue'
import App from '~/App.vue'
import store from '~/store'

import Vuetify, {
  VApp,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VApp,
  },
})

Vue.config.ignoredElements = [
  'iciba-div',
]

const main = async () => {
  await store.loadData()

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
