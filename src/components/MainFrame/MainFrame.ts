import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // tslint:disable no-unused-variable
  private msg: string = 'hello'
  private content: string = 'hello'
  // tslint:enable no-unused-variable

  // 声明周期钩子
  public mounted() {
    this.greet()
  }

  // 计算属性
  public get computedMsg(): string {
    return `computed ${this.msg}`
  }

  // 方法
  public greet() {
    return this.getMessage(this.computedMsg)
  }

  public getMessage(msg: string) {
    return msg
  }
}
