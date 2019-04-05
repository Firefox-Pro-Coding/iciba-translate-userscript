// tslint:disable-next-line:no-import-side-effect
import '~/src/util/extendIoTs'

import Vue from 'vue'
import App from '~/src/App.vue'
import store from '~/src/store'


Vue.config.ignoredElements = [
  'iciba-div',
]

const root: any = {}

const main = async () => {
  await store.loadData()

  root.app = new Vue({
    el: document.createElement('div'),
    render(h) {
      return h('app')
    },
    components: {
      App,
    },
  })

  document.body.appendChild(root.app.$el)
}

main()
