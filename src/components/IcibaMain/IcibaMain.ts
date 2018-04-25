import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { IPositionStyle, IStyle } from '~/src/interfaces/index'

// import IcibaTranslateProvider from '~/src/provider/iciba/index'
import AbstractTranslateProvider from '~/src/provider/AbstractTranslateProvider'

import insideOf from '~/src/lib/insideOf'

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
  // providers is offered while created this instance
  public providers: Array<AbstractTranslateProvider> = []
  public visible: boolean = false
  public loading: boolean = false
  public errorMessage: string = ''
  public style: IStyle = {}
  public loadingDotsNumber: number = 3
  public loadingDotsInterval: number = 0
  public sizeHelper: HTMLElement | undefined
  public icibaMainStyle: IPositionStyle = {
    ...defaultStyle,
  }
  public icibaContainerStyle: IPositionStyle = {
    ...defaultStyle,
  }
  public inputText: string = ''

  public get loadingDots() {
    return Array(this.loadingDotsNumber).fill('.').join('')
  }

  public mounted() {
    window.addEventListener('mousedown', this.handleWindowClick, false)
    this.loadingDotsInterval = window.setInterval(this.changeLoadingDots, 300)
    this.initProviders()
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    window.clearInterval(this.loadingDotsInterval)
  }

  public initProviders() {
    this.$nextTick(() => { // nextTick to wait element to be rendered
      this.providers.forEach((provider) => {
        const container = document.querySelector(
          `.mounted-element.provider-container-${provider.uniqName}`,
        )
        if (!container) {
          throw new Error('挂载provider container错误！')
        }
        provider.containerComponent.$mount(container)
      })
    })
  }

  public changeLoadingDots() {
    this.loadingDotsNumber += 1
    if (this.loadingDotsNumber > 10) {
      this.loadingDotsNumber = 3
    }
  }

  public handleInputSearch() {
    this.translate({ word: this.inputText })
  }

  public handleTranslateButtonClick(theProvider: AbstractTranslateProvider) {
    const provider = theProvider
    provider.visible = true
    this.internalTranslate(provider)
  }

  public setPosition(e: MouseEvent) {
    if (!this.sizeHelper) {
      throw new Error('sizeHelper 未定义！')
    }
    const sizeHelperBounding = this.sizeHelper.getBoundingClientRect()
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
    this.icibaMainStyle = {
      ...defaultStyle,
      ...{
        top: `${e.pageY}px`,
        left: `${e.pageX}px`,
      },
    }
  }

  public internalTranslate(provider: AbstractTranslateProvider) {
    const word = this.inputText

    this.providers.forEach(p => { p.visible = false })
    this.errorMessage = ''
    this.loading = true
    provider.translate(word).then(() => {
      provider.visible = true
    }).catch((e) => {
      this.errorMessage = e.message
    }).finally(() => {
      this.loading = false
    })
  }

  public translate({ word, e }: { word: string, e?: MouseEvent }) {
    if (e) {
      this.setPosition(e)
    }
    this.visible = true
    this.inputText = word

    this.internalTranslate(
      this.providers[0],
    )
  }

  public async handleWindowClick(e: MouseEvent) {
    if (!insideOf(e.target, this.$el)) {
      this.visible = false
    }
  }
}
