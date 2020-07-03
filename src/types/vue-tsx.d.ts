import Vue, { VNode } from 'vue';

declare global {
  namespace VueTsx {
    interface ElementAdditionalAttrs {
      'v-ripple'?: any
      vRipple?: any
      vModel?: any
    }
  }
}

declare module "vue-tsx-support/types/base" {
  interface ElementAdditionalAttrs {
    vModel?: any;
  }
}

// declare module "@vue/composition-api/dist/component/component" {
//   interface SetupContext {
//     readonly refs: any
//   }
// }

declare module '@vue/composition-api' {
  interface SetupContext {
    readonly refs: any
  }
}
