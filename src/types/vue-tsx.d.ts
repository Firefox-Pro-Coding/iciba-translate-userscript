import { VNodeData } from 'vue'

declare global {
  namespace VueTsx {
    interface ElementAdditionalAttrs {
      'v-ripple'?: any
      vRipple?: any
    }
  }
}
