import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'CoreSettings',
})
export default class App extends Vue {
  public currentTab: string = 'core'
  public form = {
    pressCtrlToDrag: false,
  }

  public mounted() {
    this.form = {
      pressCtrlToDrag: this.config.common.pressCtrlToDrag,
    }
  }
}
