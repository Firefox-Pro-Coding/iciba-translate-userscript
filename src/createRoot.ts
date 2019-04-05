import Vue from 'vue'

const icibaRoot = document.createElement('div')
icibaRoot.className = 'iciba-root'
document.body.appendChild(icibaRoot)
const shadowRoot = icibaRoot.attachShadow({ mode: 'open' })

Vue.prototype.shadowRoot = shadowRoot
Vue.prototype.icibaRoot = icibaRoot

export {
  shadowRoot,
  icibaRoot,
}
