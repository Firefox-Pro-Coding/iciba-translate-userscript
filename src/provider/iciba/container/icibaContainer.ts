import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // tslint:disable no-unused-variable
  public content: string = ''
  // tslint:enable no-unused-variable

  public handleClick(e: MouseEvent) {
    //
  }
}
