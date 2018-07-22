import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import store from '~/src/store/index'

@Component({
  name: 'CoreSettings',
})
export default class App extends Vue {
  public currentTab: string = 'core'
  public setting = store.getSetting('core')

  public input: string = ''

  public loadSetting() {
    this.setting = store.getSetting('core')
  }

  public saveSetting() {
    store.setSetting('core', this.setting)
  }
}
