import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus, { ClickTranslatePayload } from '~/bus/bus'
import zgen, { isTop } from '~/util/zIndexGenerator'

import AbstractTranslateProvider from '~/provider/AbstractTranslateProvider'

import IcibaProvider from '~/provider/Iciba/Iciba'
import GoogleDictProvider from '~/provider/GoogleDict/GoogleDict'
import GoogleTranslateProvider from '~/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/provider/BaiduTranslate/BaiduTranslate'
import SougouTranslateProvider from '~/provider/SougouTranslate/SougouTranslate'

import GoogleDictModalClass from '~/provider/GoogleDict/container/GoogleDictModal'

import insideOf from '~/util/insideOf'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import store from '~/store'

import LoadindText from './helper/LoadingText/LoadingText.vue'
import { PROVIDER } from '~/constants/constant'

interface ProviderItem {
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
  public $refs!: {
    icibaMain: HTMLDivElement
  }

  @Prop({ type: Vue })
  public sizeHelper!: Vue

  @Prop({ type: Vue })
  public icibaCircle!: Vue

  @Prop()
  public getGoogleDictModal!: () => GoogleDictModalClass | undefined

  public providers: Array<ProviderItem> = [
    { visible: false, provider: IcibaProvider },
    { visible: false, provider: GoogleDictProvider },
    { visible: false, provider: GoogleTranslateProvider },
    { visible: false, provider: BaiduTranslateProvider },
    { visible: false, provider: SougouTranslateProvider },
  ]
  public visible = false
  public loading = false
  public inputFocused = false
  public inputText: string = ''
  public errorMessage = ''
  public stickBoxVisible = false
  public lastUsedProviderName = PROVIDER.ICIBA
  public activeTask = {
    word: '',
    providerName: '' as PROVIDER | '',
    index: 0,
  }


  public drag = {
    dragging: false,
    ignoreCtrl: false,
    startPoint: { x: 0, y: 0 },
    startTransform: { x: 0, y: 0 },
  }

  public icibaContainerStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  }

  public icibaMainStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    translateX: 0,
    translateY: 0,
    zIndex: 0,
  }

  public mounted() {
    window.addEventListener('mousedown', this.handleWindowClick, false)
    window.addEventListener('mousemove', this.handleDragMove, true)
    window.addEventListener('mouseup', this.handleDragEnd, true)
    this.shadowRoot.addEventListener('mousedown', this.handleDragStart, true)
    this.shadowRoot.addEventListener('mousedown', this.handleShadowRootClick, false)
    this.shadowRoot.addEventListener('keyup', this.handleDragEnd, true)

    bus.on(bus.events.ICIBA_MAIN_TRANSLATE, this.handleIcibaCircleTranslate)
    bus.on(bus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.onGoogleDictModalOpen)
    bus.on(bus.events.GOOGLE_DICT_WORD_CLICK, this.handleGoogleDictWordClick)
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    window.removeEventListener('mousemove', this.handleDragMove, true)
    window.removeEventListener('mouseup', this.handleDragEnd, true)
    this.shadowRoot.removeEventListener('mousedown', this.handleDragStart, true)
    this.shadowRoot.removeEventListener('mousedown', this.handleShadowRootClick, false)
    this.shadowRoot.removeEventListener('keyup', this.handleDragEnd, true)

    bus.removeListener(bus.events.ICIBA_MAIN_TRANSLATE, this.handleIcibaCircleTranslate)
    bus.removeListener(bus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.onGoogleDictModalOpen)
    bus.removeListener(bus.events.GOOGLE_DICT_WORD_CLICK, this.handleGoogleDictWordClick)
  }

  /** 切换固定状态 */
  protected handleTogglePinned() {
    this.config.core.pinned = !this.config.core.pinned
    this.$store.saveConfig()
  }

  /** 输入框查词 */
  protected handleInputSearch() {
    this.translateWithProvider(this.getLastUsedProvider())
  }

  /** 点击右上翻译按钮 */
  protected handleTranslateButtonClick(provider: ProviderItem) {
    this.translateWithProvider(provider)
  }

  /** 打开设置 */
  protected handleOpenSetting() {
    this.visible = false
    bus.emit(bus.events.SETTING_PREPARE_OPEN)
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

  protected isProviderVisible(name: PROVIDER) {
    return this.config[name].display
  }

  private async handleIcibaCircleTranslate({ word, event }: ClickTranslatePayload) {
    if (!this.visible) {
      this.setPosition(event)
      this.visible = true
    } else if (!isTop(this.icibaMainStyle.zIndex)) {
      this.icibaMainStyle.zIndex = zgen()
    }

    this.inputText = word

    if (event.button === 0) {
      this.translateWithProvider(this.getDefaultProvider())
    } else if (event.button === 2 && this.config.core.icibaCircleRightClick) {
      this.translateWithProvider(this.getSecondaryProvider())
    }
  }

  private async handleGoogleDictWordClick({ word, event }: ClickTranslatePayload) {
    if (!this.visible) {
      this.visible = true
    }

    this.setPosition(event, true)

    this.inputText = word

    const googleDictProvider = this.providers.find(v => v.provider.uniqName === PROVIDER.GOOGLE_DICT)
    if (googleDictProvider) {
      this.translateWithProvider(googleDictProvider)
    }
  }

  private translateWithProvider(provideritem: ProviderItem) {
    const word = this.inputText.trim()
    if (!word) {
      this.errorMessage = '查询不能为空！'
      return
    }

    this.providers.forEach((p) => { p.visible = false })
    this.errorMessage = ''
    this.lastUsedProviderName = provideritem.provider.uniqName

    const task = {
      word,
      providerName: provideritem.provider.uniqName,
      index: this.activeTask.index + 1,
    }

    // ignore if task was exactly same as active task
    if (this.activeTask.word === task.word && this.activeTask.providerName === task.providerName) {
      return
    }

    this.activeTask = { ...task }

    this.loading = true
    provideritem.provider.translate(word).then((callback) => {
      if (this.activeTask.index === task.index) {
        callback()
        provideritem.visible = true
      }
    }, (e) => {
      console.error(e) // eslint-disable-line
      if (this.activeTask.index === task.index) {
        this.errorMessage = `${provideritem.provider.uniqName}: ${e.message}`
      }
    }).finally(() => {
      if (this.activeTask.index === task.index) {
        this.loading = false
        this.activeTask = {
          word: '',
          providerName: '',
          index: this.activeTask.index,
        }
      }
    })
  }

  /** 获取默认 provider */
  private getDefaultProvider() {
    const provider = this.providers.find(v => v.provider.uniqName === this.config.core.defaultProvider)
    if (provider) {
      return provider
    }

    return this.providers[0]
  }

  /** 获取备选 provider */
  private getSecondaryProvider() {
    const provider = this.providers.find(v => v.provider.uniqName === this.config.core.icibaCircleRightClickProvider)
    if (provider) {
      return provider
    }

    return this.providers[0]
  }

  /** 获取最近使用的 provider */
  private getLastUsedProvider() {
    const provider = this.providers.find(v => v.provider.uniqName === this.lastUsedProviderName)
    if (provider) {
      return provider
    }

    return this.providers[0]
  }

  /** 设置 IcibaMain position */
  private setPosition(e: MouseEvent, force: boolean = false) {
    if (!force && this.visible && isTop(this.icibaMainStyle.zIndex)) {
      return
    }

    // calc position
    const sizeHelperBounding = this.sizeHelper.$el.getBoundingClientRect()
    const availableSpace = {
      x: sizeHelperBounding.left - e.clientX,
      y: sizeHelperBounding.top - e.clientY,
    }

    this.icibaContainerStyle = {
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      ...{
        ...(availableSpace.x < this.config.core.icibaMainWidth ? { right: '0' } : { left: '0' }),
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

  private onGoogleDictModalOpen() {
    if (store.state.googleDict.modalVisible) {
      this.visible = false
    }
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
      Boolean(googleDictModal && insideOf(e.target, googleDictModal.$el) && googleDictModal.zIndex > this.icibaMainStyle.zIndex),
      insideOf(e.target, this.$refs.icibaMain),
      insideOf(e.target, this.icibaCircle.$el),
      this.config.core.showPin && this.config.core.pinned,
    ]
    if (ignoreCondition.some(v => v)) {
      return
    }
    this.visible = false
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

  public get computedIcibaContainerStyle() {
    return {
      top: this.icibaContainerStyle.top,
      bottom: this.icibaContainerStyle.bottom,
      left: this.icibaContainerStyle.left,
      right: this.icibaContainerStyle.right,
      width: `${this.config.core.icibaMainWidth}px`,
    }
  }
}
