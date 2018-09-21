import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { EVENT_NAMES } from '~/src/constants/constant'
import bus, { IcibaMainTranslatePayload } from '~/src/bus'
import zgen from '~/src/lib/zIndexGenerator'

import {
  IPositionStyle,
  IStyle,
  ITranslateProviderSettingDescriptors,
} from '~/src/types/index'

import AbstractTranslateProvider from '~/src/provider/AbstractTranslateProvider'

import IcibaProvider from '~/src/provider/Iciba/Iciba'
import GoogleDictProvider from '~/src/provider/GoogleDict/GoogleDict'
import GoogleTranslateProvider from '~/src/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/src/provider/BaiduTranslate/BaiduTranslate'

import insideOf from '~/src/lib/insideOf'
import calcMouseEventPosition from '~/src/lib/calcMouseEventPosition'

const defaultStyle = {
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
}

@Component({
  name: 'IcibaMain',
})
export default class App extends Vue {
  public providers: Array<AbstractTranslateProvider> = [
    IcibaProvider,
    GoogleDictProvider,
    GoogleTranslateProvider,
    BaiduTranslateProvider,
  ]
  public visible: boolean = false
  public loading: boolean = false
  public errorMessage: string = ''
  public style: IStyle = {}
  public zIndex: number = 0
  public loadingDotsNumber: number = 3
  public loadingDotsInterval: number = 0
  // public sizeHelper: HTMLElement | undefined
  public icibaMainStyle: IPositionStyle = {
    ...defaultStyle,
  }
  public icibaContainerStyle: IPositionStyle = {
    ...defaultStyle,
  }
  public inputText: string = ''
  public settingDescriptor: ITranslateProviderSettingDescriptors = [
    {
      name: 'draggable',
      description: '查询结果窗口是否可拖拽',
      type: 'select',
      default: 'false',
      options: ['true', 'false'],
    },
  ]


  @Prop({ type: Vue })
  public sizeHelper?: Vue

  @Prop({ type: Vue })
  public icibaCircle!: Vue

  public get loadingDots() {
    return Array(this.loadingDotsNumber).fill('.').join('')
  }

  public mounted() {
    bus.on(EVENT_NAMES.ICIBA_MAIN_TRANSLATE, this.translate)
    window.addEventListener('mousedown', this.handleWindowClick, false)
    this.loadingDotsInterval = window.setInterval(this.changeLoadingDots, 300)
    this.initProviders()
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    window.clearInterval(this.loadingDotsInterval)
  }

  /** loading 文字动态变化 */
  public changeLoadingDots() {
    this.loadingDotsNumber += 1
    if (this.loadingDotsNumber > 10) {
      this.loadingDotsNumber = 3
    }
  }

  /** 输入框查词 */
  public handleInputSearch() {
    this.translate({ word: this.inputText })
  }

  /* provider icon click */
  public handleTranslateButtonClick(provider: AbstractTranslateProvider) {
    this.translateWithProvider(provider)
  }

  public setPosition(e: MouseEvent) {
    if (!this.sizeHelper) {
      throw new Error('sizeHelper 未定义！')
    }
    const sizeHelperBounding = this.sizeHelper.$el.getBoundingClientRect()
    const availableSpace = {
      x: sizeHelperBounding.left - e.clientX,
      y: sizeHelperBounding.top - e.clientY,
    }
    const style = {
      ...(availableSpace.x < 300 ? { right: '0' } : { left: '0' }),
      ...(availableSpace.y < 200 ? { bottom: '0' } : { top: '0' }),
    }
    this.icibaContainerStyle = {
      ...defaultStyle,
      ...style,
    }

    const calcedPosition = calcMouseEventPosition(e)

    this.icibaMainStyle = {
      ...defaultStyle,
      ...{
        top: `${calcedPosition.top}px`,
        left: `${calcedPosition.left}px`,
      },
    }
  }

  public internalTranslate(provider: AbstractTranslateProvider) {
    const word = this.inputText.trim()
    this.errorMessage = ''

    if (!word) {
      this.errorMessage = '查询不能为空！'
      return
    }
    this.loading = true
    provider.translate(word).then(() => {
      this.loading = false
      // DON'T CHANGE!
      // call this callback right after setting loading to false
      // this insure that provider container is visible
      provider.translateCallback()
    }).catch((e) => {
      this.errorMessage = `${provider.uniqName}: ${e.message}`
      this.loading = false
    })
  }

  public translate({ word, event }: IcibaMainTranslatePayload) {
    if (event && !this.visible) {
      this.setPosition(event)
    }
    this.zIndex = zgen()
    this.visible = true
    this.inputText = word

    this.translateWithProvider(this.providers[1])
  }

  public translateWithProvider(provider: AbstractTranslateProvider) {
    this.providers.forEach((p) => { p.visible = false })
    provider.visible = true
    this.internalTranslate(provider)
  }

  public async handleWindowClick(e: MouseEvent) {
    const hasCloseClass = (_target: HTMLElement) => {
      let target: HTMLElement | null = _target
      while (target) {
        if (target.classList.contains('close-iciba-main')) {
          return true
        }
        target = target.parentElement
      }
      return false
    }
    const closeConditions = [
      !insideOf(e.target, this.$el.parentElement),
      hasCloseClass(e.target as HTMLElement),
    ]
    if (closeConditions.some(v => v)) {
      this.visible = false
    }
  }

  public handleOpenSetting() {
    this.visible = false
    bus.emit(EVENT_NAMES.SETTING_PREPARE_OPEN)
  }

  public get computedStyle() {
    return {
      ...this.icibaMainStyle,
      zIndex: this.zIndex,
    }
  }

  private initProviders() {
    this.$nextTick(() => { // nextTick to wait element to be rendered
      this.providers.forEach((provider) => {
        const name = `provider-container-${provider.uniqName}`
        const containerInstanceArr = this.$refs[name] as Array<any>
        const containerInstance = containerInstanceArr.length ? containerInstanceArr[0] : null
        if (!containerInstance) {
          throw new Error('挂载provider container错误！')
        }
        provider.componentInstance = containerInstance
      })
    })
  }
}
