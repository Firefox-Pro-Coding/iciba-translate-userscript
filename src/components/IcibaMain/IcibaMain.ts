import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { IPositionStyle, IStyle } from '~/src/interfaces/index'

// import IcibaTranslateProvider from '~/src/provider/iciba/index'
import AbstractTranslateProvider from '~/src/provider/AbstractTranslateProvider'

import insideOf from '~/src/lib/insideOf'

@Component({
  name: 'IcibaMain',
})
export default class App extends Vue {
  // providers is offered while created this instance
  public providers: Array<AbstractTranslateProvider> = []
  public visible: boolean = false
  public loading: boolean = false
  public style: IStyle = {}
  public loadingDotsNumber: number = 3
  public loadingDotsInterval: number = 0
  public sizeHelper: HTMLElement | undefined

  public internalStyle: IPositionStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
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
    this.providers.forEach(p => { p.visible = false })
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
    console.log(e)
    console.log(availableSpace)
    this.internalStyle = {
      ...{
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },
      ...{
        top: `${e.pageY}px`,
        left: `${e.pageX}px`,
      },
    }
  }

  public internalTranslate(provider: AbstractTranslateProvider) {
    const word = this.inputText

    this.loading = true
    provider.translate(word).then(() => {
      provider.visible = true
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
