import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/src/components/SettingPage/SettingPage.vue'

import bus from '~/src/bus'
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
  public settingPageVisible = false

  public mounted() {
    const icibaCircle = this.$refs.icibaCircle as any
    const icibaMain = this.$refs.icibaMain as any
    const sizeHelper = this.$refs.sizeHelper as any

    icibaCircle.$on('translate', (param: { word: string, e: MouseEvent}) => {
      icibaMain.translate(param)
    })
    icibaCircle.setIcibaMain(icibaMain.$el)
    icibaMain.sizeHelper = sizeHelper.$el

    bus.on(EVENT_NAMES.SETTING_PREPARE_OPEN, this.openSettingPage)
  }

  public openSettingPage() {
    if (!this.settingPageVisible) {
      this.settingPageVisible = true
    }
    this.$nextTick(() => {
      bus.emit(EVENT_NAMES.SETTING_OPEN)
    })
  }
}
