import Vue from 'vue'
import store from '~/store/index'

declare module 'vue/types/vue' {
  interface Vue {
    store: typeof store.state
    shadowRoot: ShadowRoot
    icibaRoot: HTMLDivElement
  }
}
