import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { IPositionStyle, IStyle } from '~/src/types/index'
import sleep from '~/src/lib/sleep'
import zgen from '~/src/lib/zIndexGenerator'

import bus, { IcibaMainTranslatePayload } from '~/src/bus'
import { EVENT_NAMES } from '~/src/constants/constant'

@Component({
  name: 'IcibaCircle',
})
export default class App extends Vue {
  public visible = false
  public word: string = ''
  public style: IStyle = {}
  public zIndex: number = 0
  public internalStyle: IPositionStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  }

  public mounted() {
    window.addEventListener('mouseup', this.handleWindowClick, false)
  }

  public destroyed() {
    window.removeEventListener('mouseup', this.handleWindowClick, false)
  }

  public handleClick(event: MouseEvent) {
    this.visible = false
    const payload: IcibaMainTranslatePayload = {
      word: this.word,
      event,
    }
    bus.emit(EVENT_NAMES.ICIBA_MAIN_PREPARE_TRANSLATE, payload)
  }

  public async handleWindowClick(e: MouseEvent) {
    const notHandleConditions = [
      // click on it self
      e.target === this.$el,

      // not left click
      e.button !== 0,

      // inside of result box
      // insideOf(e.target, this.icibaMain),
    ]

    if (notHandleConditions.some(v => v)) {
      return
    }

    await sleep(10)
    const selection = window.getSelection().toString().trim()
    // only show button if selection is valid
    if (selection.length) {
      this.visible = true
      this.word = selection
      this.zIndex = zgen()
      this.style = {
        top: e.pageY + 7,
        left: e.pageX + 7,
      }
    } else {
      this.visible = false
    }
  }

  public get computedStyle() {
    return {
      ...this.internalStyle,
      zIndex: this.zIndex,
    }
  }

  @Watch('style')
  public onStyleChange() {
    const init: IPositionStyle = {}
    this.internalStyle = {
      ...{
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },
      ...Object.entries(this.style).reduce(
        (p, c) => {
          const [k, v] = c
          return {
            ...p,
            [k]: `${v}px`,
          }
        },
        init,
      ),
    }
  }
}
