import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/src/components/SettingPage/SettingPage.vue'

import bus, { IcibaMainTranslatePayload } from '~/src/bus'
import { EVENT_NAMES } from '~/src/constants/constant'

@Component({
  name: 'IcibaAppRoot',
  components: {
    IcibaMain,
    IcibaCircle,
    SizeHelper,
    SettingPage,
  },
})
export default class extends Vue {
  public icibaMainFirstLoaded = false
  public settingPageFirstLoaded = false

  public mounted() {
    bus.on(EVENT_NAMES.SETTING_PREPARE_OPEN, this.openSettingPage)
    bus.on(EVENT_NAMES.ICIBA_MAIN_PREPARE_TRANSLATE, this.openIcibaMain)
  }

  /** 查词窗口懒加载 */
  private openIcibaMain(payload: IcibaMainTranslatePayload) {
    let needInitIcibaMain = false
    if (!this.icibaMainFirstLoaded) {
      this.icibaMainFirstLoaded = true
      needInitIcibaMain = true
    }
    // wait for element to be mounted
    this.$nextTick(() => {
      if (needInitIcibaMain) {
        const icibaMain = this.$refs.icibaMain as any
        const sizeHelper = this.$refs.sizeHelper as any
        icibaMain.sizeHelper = sizeHelper.$el
      }
      bus.emit(EVENT_NAMES.ICIBA_MAIN_TRANSLATE, payload)
    })
  }

  /** 设置窗口懒加载 */
  private openSettingPage() {
    if (!this.settingPageFirstLoaded) {
      this.settingPageFirstLoaded = true
    }
    // wait for element to be mounted
    this.$nextTick(() => {
      bus.emit(EVENT_NAMES.SETTING_OPEN)
    })
  }
}
