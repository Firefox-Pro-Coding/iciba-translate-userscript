import Vue from 'vue'
import App from '~/src/components/App/App.vue'

Vue.config.ignoredElements = [
  'iciba-div',
]

const root: any = {}

const main = async () => {
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
