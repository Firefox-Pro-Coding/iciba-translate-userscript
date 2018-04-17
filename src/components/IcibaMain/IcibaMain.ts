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
  }

  public destroyed() {
    window.removeEventListener('mousedown', this.handleWindowClick, false)
    window.clearInterval(this.loadingDotsInterval)
  }

  public changeLoadingDots() {
    this.loadingDotsNumber += 1
    if (this.loadingDotsNumber > 10) {
      this.loadingDotsNumber = 3
    }
  }

  public translate({ word, e }: { word: string, e: MouseEvent }) {
    this.inputText = word
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
    this.visible = true
    this.loading = true
    console.log(word)

    // TODO show loading
    // get Translate
    // show translate
  }

  public async handleWindowClick(e: MouseEvent) {
    if (!insideOf(e.target, this.$el)) {
      this.visible = false
    }
  }
}
