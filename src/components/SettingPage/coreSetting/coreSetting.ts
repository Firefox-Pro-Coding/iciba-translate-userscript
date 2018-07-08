import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Store, { CoreStore } from '~/src/store/index'

@Component({
  name: 'CoreSettings',
})
export default class App extends Vue {
  public currentTab: string = 'core'
  public setting: CoreStore = Store.state.core

  public loadSetting() {
    this.setting = Store.state.core
  }
}
