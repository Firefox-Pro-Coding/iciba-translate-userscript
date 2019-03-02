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

  public $refs!: {
    icibaMain: HTMLDivElement
  }

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
  public drag = {
    dragging: false,
    startPoint: {
      x: 0,
      y: 0,
    },
    startStyle: { ...defaultStyle, zIndex: 0 },
  }

  public icibaContainerStyle = { ...defaultStyle }
  public icibaMainStyle = {
    ...defaultStyle,
    zIndex: 0,
  }

  public mounted() {
    bus.on(bus.events.ICIBA_MAIN_TRANSLATE, this.translate)
    window.addEventListener('mousedown', this.handleWindowClick, false)
    window.addEventListener('mousedown', this.handleDragStart, true)
    window.addEventListener('mousemove', this.handleDragMove, true)
    window.addEventListener('mouseup', this.handleDragEnd, true)
    window.addEventListener('keyup', this.handleDragEnd, true)
    // this.initProviders()
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    window.removeEventListener('mousedown', this.handleDragStart, true)
    window.removeEventListener('mousemove', this.handleDragMove, true)
    window.removeEventListener('mouseup', this.handleDragEnd, true)
    window.removeEventListener('keyup', this.handleDragEnd, true)
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

  private handleDragStart(e: MouseEvent) {
    if (!insideOf(e.target, this.$refs.icibaMain) || !e.ctrlKey) {
      return
    }
    e.preventDefault()
    this.drag.dragging = true
    this.drag.startPoint = {
      x: e.screenX,
      y: e.screenY,
    }
    this.drag.startStyle = this.icibaMainStyle
  }

  private handleDragMove(e: MouseEvent) {
    if (!this.drag.dragging || !e.ctrlKey) {
      return
    }
    e.preventDefault()
    const deltaX = e.screenX - this.drag.startPoint.x
    const deltaY = e.screenY - this.drag.startPoint.y

    const style = { ...this.drag.startStyle }

    if (style.top === 'auto') {
      style.bottom = `${parseInt(style.bottom, 10) - deltaY}px`
    } else {
      style.top = `${parseInt(style.top, 10) + deltaY}px`
    }

    if (style.left === 'auto') {
      style.right = `${parseInt(style.right, 10) - deltaX}px`
    } else {
      style.left = `${parseInt(style.left, 10) + deltaX}px`
    }

    this.icibaMainStyle = style
  }

  private handleDragEnd() {
    this.drag.dragging = false
  }
}
