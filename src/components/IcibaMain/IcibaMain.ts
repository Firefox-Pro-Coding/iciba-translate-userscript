import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus, { IcibaMainTranslatePayload } from '~/src/bus/bus'
import zgen from '~/src/util/zIndexGenerator'

import AbstractTranslateProvider from '~/src/provider/AbstractTranslateProvider'

import IcibaProvider from '~/src/provider/Iciba/Iciba'
import GoogleDictProvider from '~/src/provider/GoogleDict/GoogleDict'
import GoogleTranslateProvider from '~/src/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/src/provider/BaiduTranslate/BaiduTranslate'

import LoadindText from './helper/LoadingText/LoadingText.vue'

import insideOf from '~/src/util/insideOf'
import calcMouseEventPosition from '~/src/util/calcMouseEventPosition'

const defaultStyle = {
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
}

interface Provider {
  visible: boolean
  provider: AbstractTranslateProvider
}

@Component({
  name: 'IcibaMain',
  components: {
    LoadindText,
  },
})
export default class App extends Vue {
  @Prop({ type: Vue })
  public sizeHelper?: Vue

  @Prop()
  public rootElement!: HTMLDivElement

  public providers: Array<Provider> = [
    { visible: false, provider: IcibaProvider },
    { visible: false, provider: GoogleDictProvider },
    { visible: false, provider: GoogleTranslateProvider },
    { visible: false, provider: BaiduTranslateProvider },
  ]

  public visible = false
  public loading = false
  public inputText: string = ''
  public errorMessage = ''

  public icibaContainerStyle = { ...defaultStyle }
  public icibaMainStyle = {
    ...defaultStyle,
    zIndex: 0,
  }

  public mounted() {
    bus.on(bus.events.ICIBA_MAIN_TRANSLATE, this.translate)
    window.addEventListener('mousedown', this.handleWindowClick, false)
    // this.initProviders()
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
  }

  /** 输入框查词 */
  public handleInputSearch() {
    this.translate({ word: this.inputText })
  }

  /** 点击右上翻译按钮 */
  public handleTranslateButtonClick(provider: Provider) {
    this.translateWithProvider(provider)
  }

  /** 打开设置 */
  public handleOpenSetting() {
    this.visible = false
    bus.emit(bus.events.SETTING_PREPARE_OPEN)
  }

  private translate({ word, event }: IcibaMainTranslatePayload) {
    if (event && !this.visible) {
      this.setPosition(event)
    }
    this.visible = true
    this.inputText = word

    this.translateWithProvider(this.providers[0])
  }

  private translateWithProvider(provider: Provider) {
    this.providers.forEach((p) => { p.visible = false })
    provider.visible = true
    this.internalTranslate(provider)
  }


  private async handleWindowClick(e: MouseEvent) {
    if (insideOf(e.target, this.rootElement)) {
      return
    }
    this.visible = false
  }

  private internalTranslate(item: Provider) {
    const word = this.inputText.trim()
    this.errorMessage = ''

    if (!word) {
      this.errorMessage = '查询不能为空！'
      return
    }
    this.loading = true
    item.provider.translate(word).catch((e) => {
      console.error(e) // eslint-disable-line
      this.errorMessage = `${item.provider.uniqName}: ${e.message}`
    }).finally(() => {
      this.loading = false
    })
  }

  private setPosition(e: MouseEvent) {
    if (!this.sizeHelper) {
      throw new Error('sizeHelper 未定义！')
    }
    const sizeHelperBounding = this.sizeHelper.$el.getBoundingClientRect()
    const availableSpace = {
      x: sizeHelperBounding.left - e.clientX,
      y: sizeHelperBounding.top - e.clientY,
    }

    this.icibaContainerStyle = {
      ...defaultStyle,
      ...{
        ...(availableSpace.x < 300 ? { right: '0' } : { left: '0' }),
        ...(availableSpace.y < 200 ? { bottom: '0' } : { top: '0' }),
      },
    }

    const calcedPosition = calcMouseEventPosition(e)

    this.icibaMainStyle = {
      top: `${calcedPosition.top}px`,
      left: `${calcedPosition.left}px`,
      bottom: 'auto',
      right: 'auto',
      zIndex: zgen(),
    }
  }
}
