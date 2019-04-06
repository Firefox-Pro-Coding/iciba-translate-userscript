import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import CoreSetting from './coreSetting/coreSetting.vue'
import bus from '~/bus/bus'
import zgen from '~/util/zIndexGenerator'

type TabNames = 'core' | 'iciba'

@Component({
  name: 'SettingPage',
  components: {
    CoreSetting,
  },
})
export default class App extends Vue {
  public tab = 0
  public currentTab: TabNames = 'core'
  public visible: boolean = false
  public zIndex: number = 0
  public bodyOverflowXValue: string = ''
  public bodyOverflowYValue: string = ''

  public mounted() {
    bus.on(bus.events.SETTING_OPEN, this.openSetting)
  }

  public openSetting() {
    this.bodyOverflowXValue = document.body.style.overflowX || ''
    this.bodyOverflowYValue = document.body.style.overflowY || ''
    this.zIndex = zgen()
    this.visible = true
  }

  public handleCloseSetting(e: MouseEvent) {
    if (e.target && e.target instanceof HTMLElement && e.target.classList.contains('iciba-setting-modal')) {
      this.closeSetting()
    }
  }

  public closeSetting() {
    document.body.style.overflowX = this.bodyOverflowXValue
    document.body.style.overflowY = this.bodyOverflowYValue
    this.visible = false
  }

  public switchTab(tabName: TabNames) {
    this.currentTab = tabName
  }
}
