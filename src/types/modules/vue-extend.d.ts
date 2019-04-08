import Vue from 'vue'
import store from '~/store/index'

declare module 'vue/types/vue' {
  interface Vue {
    VApp: Vue
    $store: typeof store
    store: typeof store.state
    config: typeof store.config
    shadowRoot: ShadowRoot
    icibaRoot: HTMLDivElement
  }
}
