import Vue from 'vue'
import store from '~/store/index'

import { toast } from '~/plugin/toast/toastPlugin'

declare module 'vue/types/vue' {
  interface Vue {
    VApp: Vue
    $toast: typeof toast
    $store: typeof store
    store: typeof store.state
    config: typeof store.config
    shadowRoot: ShadowRoot
    icibaRoot: HTMLDivElement
  }
}
