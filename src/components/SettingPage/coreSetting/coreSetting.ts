import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Store from '~/src/store/index'
import { CoreStore } from '~/src/store/core'

@Component({
  name: 'CoreSettings',
})
export default class App extends Vue {
  public currentTab: string = 'core'
  public setting: CoreStore = Store.state.core

  public input: string = ''

  public loadSetting() {
    this.setting = Store.state.core
  }
}
