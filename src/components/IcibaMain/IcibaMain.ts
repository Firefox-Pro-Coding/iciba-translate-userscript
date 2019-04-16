import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus, { IcibaCircleClickTranslatePayload } from '~/bus/bus'
import zgen, { isTop } from '~/util/zIndexGenerator'

import AbstractTranslateProvider from '~/provider/AbstractTranslateProvider'

import IcibaProvider from '~/provider/Iciba/Iciba'
import GoogleDictProvider from '~/provider/GoogleDict/GoogleDict'
import GoogleTranslateProvider from '~/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/provider/BaiduTranslate/BaiduTranslate'

import insideOf from '~/util/insideOf'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import store from '~/store'

import LoadindText from './helper/LoadingText/LoadingText.vue'
import { PROVIDER } from '~/constants/constant'

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
export default class IcibaMain extends Vue {
  @Prop({ type: Vue })
  public sizeHelper?: Vue

  @Prop({ type: Vue })
  public icibaCircle!: Vue

  @Prop()
  public getGoogleDictModal!: () => Vue | undefined

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
  public inputFocused = false
  public inputText: string = ''
  public errorMessage = ''

  public drag = {
    dragging: false,
    ignoreCtrl: false,
    startPoint: { x: 0, y: 0 },
    startTransform: { x: 0, y: 0 },
  }

  public icibaContainerStyle = { ...defaultStyle }
  public icibaMainStyle = {
    ...defaultStyle,
    translateX: 0,
    translateY: 0,
    zIndex: 0,
  }

  public stickBoxVisible = false

  public currentProviderName = PROVIDER.ICIBA

  public mounted() {
    bus.on(bus.events.ICIBA_MAIN_TRANSLATE, this.handleIcibaCircleTranslate)
    window.addEventListener('mousedown', this.handleWindowClick, false)
    this.shadowRoot.addEventListener('mousedown', this.handleDragStart, true)
    window.addEventListener('mousemove', this.handleDragMove, true)
    window.addEventListener('mouseup', this.handleDragEnd, true)
    this.shadowRoot.addEventListener('keyup', this.handleDragEnd, true)

    this.shadowRoot.addEventListener('mousedown', this.handleShadowRootClick, false)

    // this.initProviders()
    bus.on(bus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.checkWhenModalOpen)
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    this.shadowRoot.removeEventListener('mousedown', this.handleDragStart, true)
    window.removeEventListener('mousemove', this.handleDragMove, true)
    window.removeEventListener('mouseup', this.handleDragEnd, true)
    this.shadowRoot.removeEventListener('keyup', this.handleDragEnd, true)

    this.shadowRoot.removeEventListener('mousedown', this.handleShadowRootClick, false)

    bus.removeListener(bus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.checkWhenModalOpen)
  }

  /** 输入框查词 */
  public handleInputSearch() {
    this.translateWithProvider(this.getCurrentProvider())
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

  /** 切换固定状态 */
  public togglePinned() {
    this.config.core.pinned = !this.config.core.pinned
    this.$store.saveConfig()
  }

  protected isProviderVisible(name: PROVIDER) {
    return this.config[name].display
  }

  protected handlePinDragStart(e: MouseEvent) {
    e.preventDefault()
    this.removeSelection()
    this.drag = {
      dragging: true,
      ignoreCtrl: true,
      startPoint: {
        x: e.screenX,
        y: e.screenY,
      },
      startTransform: {
        x: this.icibaMainStyle.translateX,
        y: this.icibaMainStyle.translateY,
      },
    }
  }

  private async handleIcibaCircleTranslate({ word, event }: IcibaCircleClickTranslatePayload) {
    if (!this.visible) {
      this.setPosition(event)
      this.visible = true
    } else if (!isTop(this.icibaMainStyle.zIndex)) {
      this.setPosition(event)
    }

    this.inputText = word
    this.translateWithProvider(this.getDefaultProvider())
  }

  private translateWithProvider(provider: Provider) {
    this.providers.forEach((p) => { p.visible = false })
    provider.visible = true
    this.currentProviderName = provider.provider.uniqName
    this.internalTranslate(provider)
  }

  private async handleWindowClick(e: MouseEvent) {
    // outside shadow-root
    if (e.target !== this.icibaRoot && (!this.config.core.showPin || !this.config.core.pinned)) {
      this.visible = false
    }
  }

  private handleShadowRootClick(e: Event) {
    const googleDictModal = this.getGoogleDictModal()
    const ignoreCondition = [
      Boolean(googleDictModal && insideOf(e.target, googleDictModal.$el) && !isTop(this.icibaMainStyle.zIndex)),
      insideOf(e.target, this.$refs.icibaMain),
      insideOf(e.target, this.icibaCircle.$el),
      this.config.core.showPin && this.config.core.pinned,
    ]
    if (ignoreCondition.some(v => v)) {
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

  private getDefaultProvider() {
    const provider = this.providers.find(v => v.provider.uniqName === this.config.core.defaultProvider)
    if (provider) {
      return provider
    }

    return this.providers[0]
  }

  private getCurrentProvider() {
    const provider = this.providers.find(v => v.provider.uniqName === this.currentProviderName)
    if (provider) {
      return provider
    }

    return this.providers[0]
  }

  /** 设置 IcibaMain position */
  private setPosition(e: MouseEvent) {
    if (!this.sizeHelper) {
      throw new Error('sizeHelper 未定义！')
    }

    if (this.visible && isTop(this.icibaMainStyle.zIndex)) {
      return
    }

    // calc position
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
      translateX: 0,
      translateY: 0,
      zIndex: zgen(),
    }
  }

  private checkWhenModalOpen() {
    if (store.state.googleDictModalVisible) {
      this.visible = false
    }
  }

  private handleDragStart(_e: Event) {
    const e: MouseEvent = _e as any
    this.drag.ignoreCtrl = false
    if (!insideOf(e.target, this.$refs.icibaMain) || !e.ctrlKey) {
      return
    }
    if (!this.config.core.pressCtrlToDrag) {
      return
    }
    this.removeSelection()
    e.preventDefault()
    this.drag = {
      dragging: true,
      ignoreCtrl: false,
      startPoint: {
        x: e.screenX,
        y: e.screenY,
      },
      startTransform: {
        x: this.icibaMainStyle.translateX,
        y: this.icibaMainStyle.translateY,
      },
    }
  }

  private handleDragMove(_e: Event) {
    const e: MouseEvent = _e as any
    if (!this.drag.dragging || (!this.drag.ignoreCtrl && !e.ctrlKey)) {
      return
    }
    const deltaX = e.screenX - this.drag.startPoint.x
    const deltaY = e.screenY - this.drag.startPoint.y

    window.requestAnimationFrame(() => {
      this.icibaMainStyle.translateX = this.drag.startTransform.x + deltaX
      this.icibaMainStyle.translateY = this.drag.startTransform.y + deltaY
    })
  }

  private handleDragEnd() {
    this.drag.dragging = false
  }

  private removeSelection() {
    const selection = window.getSelection()
    if (selection && selection.removeAllRanges) {
      selection.removeAllRanges()
    }
  }

  public get computedIcibaMainStyle() {
    return {
      top: this.icibaMainStyle.top,
      bottom: this.icibaMainStyle.bottom,
      left: this.icibaMainStyle.left,
      right: this.icibaMainStyle.right,
      transform: `translate(${this.icibaMainStyle.translateX}px, ${this.icibaMainStyle.translateY}px)`,
      zIndex: this.icibaMainStyle.zIndex,
    }
  }
}
