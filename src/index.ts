import Vue from 'vue'
import App from '~/src/App.vue'
import store from '~/src/store/index'

Vue.config.ignoredElements = [
  'iciba-div',
]

const root: any = {}

const main = async () => {
  // loading settings before mount root element
  await store.loadSetting()

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
