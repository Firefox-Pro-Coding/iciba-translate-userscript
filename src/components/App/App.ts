import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/src/components/SettingPage/SettingPage.vue'

import bus from '~/src/bus'
import { got } from '~/src/lib/gmapi'
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
  public isElementLoaded = false

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

  /** 打开设置窗口，异步加载element-ui */
  public async openSettingPage() {
    if (!this.isElementLoaded) {
      try {
        await Promise.all([
          // load element-ui script
          (async () => {
            const script = await got({
              method: 'get',
              url: 'https://unpkg.com/element-ui@2.4.3/lib/index.js',
            })

            const e = script.responseText.match(/^!function\(e,t\).*?this,(.*)\);$/)
            if (!e) {
              throw new Error('加载element-ui失败')
            }
            // eslint-disable-next-line
            const f = new Function(`return ${e[1]}`)
            const elementModule = f()
            const elementui = elementModule(Vue)
            Vue.use(elementui)
          })(),
          // load element-ui style
          new Promise((rs) => {
            const style = document.createElement('link') as HTMLLinkElement
            style.href = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
            style.rel = 'stylesheet'
            document.head.appendChild(style)
            style.onload = () => {
              rs()
            }
          }),
        ])
        this.isElementLoaded = true
      } catch (e) {
        alert(`打开设置失败！(${e.message})`)
        return
      }
    }
    if (!this.settingPageVisible) {
      this.settingPageVisible = true
    }
    this.$nextTick(() => {
      bus.emit(EVENT_NAMES.SETTING_OPEN)
    })
  }
}
