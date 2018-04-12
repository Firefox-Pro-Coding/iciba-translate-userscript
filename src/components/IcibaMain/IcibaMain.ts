import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import MainFrame from '~/src/components/MainFrame/MainFrame.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import { ICircleStyleParam } from '~/src/interfaces/index'

import IcibaTranslateProvider from '~/src/provider/iciba/iciba'
import AbstractTranslateProvider from '~/src/provider/AbstractTranslateProvider'

import insideOf from '~/src/lib/insideOf'
@Component({
  name: 'IcibaMain',
  components: {
    IcibaCircle,
    MainFrame,
  },
})
export default class App extends Vue {
  // tslint:disable no-unused-variable
  private content: string = 'hello'
  private providers: Array<AbstractTranslateProvider> = []

  private circleStyle: ICircleStyleParam = {}
  private circleVisible: boolean = false

  private containerVisible: boolean = false

  private word: string = ''
  // tslint:enable no-unused-variable

  public mounted() {
    this.providers.push(new IcibaTranslateProvider())
    this.bindEventListener()
  }

  public windowClickListener(e: MouseEvent) {
    const target = e.target as Node
    const parent = this.$refs.circle as Node
    if (insideOf(target, parent)) {
      return
    }
    const word = window.getSelection().toString().trim()
    if (!word.length) {
      this.circleVisible = false
      return
    }
    this.word = word
    this.circleStyle = {
      top: `${e.pageY}px`,
      left: `${e.pageX}px`,
    }
    this.circleVisible = true
  }

  public windowKeyDownListener(e: KeyboardEvent) {
    //
  }

  public handleCircleClick(word: string) {
    this.translate(word)
  }

  private translate(word: string) {
    // TODO show loading
    // get Translate
    // show translate
  }

  private bindEventListener() {
    window.addEventListener('mouseup', (e) => {
      this.windowClickListener(e)
    }, false)
    window.addEventListener('keydown', (e) => {
      this.windowKeyDownListener(e)
    }, false)
  }
}
