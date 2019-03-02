// vue-module.d.ts
// tslint:disable max-classes-per-file
/* eslint-disable */

declare module '*IcibaCircle.vue' {
  import Vue from 'vue'
  class IcibaCircle extends Vue {
    public visible: boolean
    public setIcibaMain(node: Node): void
  }
  export default IcibaCircle
}

declare module '*IcibaMain.vue' {
  import Vue from 'vue'
  class IcibaMain extends Vue {
    public sizeHelper: HTMLElement
    public translate(p: { word: string, e: MouseEvent }): void | Promise<void>
    public getPosition(n: number): string
  }
  export default IcibaMain
}

declare module '*GoogleDictContainer.vue' {
  import Vue from 'vue'
  class GoogleDictContainer extends Vue {
    public dictionaryData: any
  }
  export default GoogleDictContainer
}


declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
