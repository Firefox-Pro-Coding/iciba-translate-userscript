// vue-module.d.ts
// tslint:disable max-classes-per-file
/* eslint-disable */

declare module '*IcibaCircle.vue' {
  import Vue from 'vue'
  class IcibaCircle extends Vue {

  }
  export default IcibaCircle
}

declare module '*IcibaMain.vue' {
  import Vue from 'vue'
  class IcibaMain extends Vue {
    public getPosition(n: number): string
  }
  export default IcibaMain
}

// declare module '*.vue' {
//   import Vue from 'vue'
//   export default Vue
// }
