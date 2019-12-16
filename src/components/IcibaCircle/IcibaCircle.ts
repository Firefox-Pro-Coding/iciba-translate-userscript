import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import zgen from '~/util/zIndexGenerator'

import bus, { ClickTranslatePayload } from '~/bus/bus'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

interface IcibaPositionStyle {
  top?: string
  bottom?: string
  left?: string
  right?: string
}
interface IcibaStyle {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

@Component({
  name: 'IcibaCircle',
})
export default class IcibaCircle extends Vue {
  public visible = false
  public ignoreMouseUp = false
  public word: string = ''
  public style: IcibaStyle = {}
  public zIndex: number = 0
  public internalStyle: IcibaPositionStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  }

  public mounted() {
    window.addEventListener('mouseup', this.handleMouseUp, true)
    this.shadowRoot.addEventListener('mouseup', this.handleShadowRootMouseUp, true)
  }

  public destroyed() {
    window.removeEventListener('mouseup', this.handleMouseUp, false)
    this.shadowRoot.removeEventListener('mouseup', this.handleShadowRootMouseUp, true)
  }

  protected handleSelfMouseUp(event: MouseEvent) {
    const payload: ClickTranslatePayload = {
      word: this.word,
      event,
    }

    // have to wait handleContextmenu trigger
    setTimeout(() => {
      this.visible = false
      bus.emit(bus.events.ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE, payload)
      this.removeSelection()
    })
  }

  protected handleSelfMouseover(event: MouseEvent) {
    if (!this.config.core.mouseOverTranslate) {
      return
    }

    this.visible = false
    const payload: ClickTranslatePayload = {
      word: this.word,
      event,
    }
    bus.emit(bus.events.ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE, payload)
  }

  protected handleMouseUp(e: MouseEvent, proxied = false) {
    // let handleShadowRootClick handle

    if (!proxied && e.target === this.icibaRoot) {
      return
    }
    if (proxied && e.target === this.$el) {
      return
    }

    if (this.config.core.pressCtrlToShowCircle && !e.ctrlKey) {
      this.visible = false
      return
    }

    const selection = window.getSelection()
    if (!selection || !String(selection)) {
      this.visible = false
      return
    }

    const selectionString = selection.toString().trim()
    // only show button if selection is valid
    if (!selectionString.length) {
      this.visible = false
      return
    }

    if (this.config.core.selectionMaxLengthCut && selectionString.length > this.config.core.selectionMaxLength) {
      this.visible = false
      return
    }

    this.showIcibaCircle(e, selectionString)
  }

  protected handleShadowRootMouseUp(e: Event) {
    this.handleMouseUp(e as MouseEvent, true)
  }

  private showIcibaCircle(e: MouseEvent, word: string) {
    // await sleep(10)
    this.visible = true
    this.word = word
    this.zIndex = zgen()

    const calcedPosition = calcMouseEventPosition(e)

    this.style = {
      top: calcedPosition.top + this.config.core.icibaCircleOffsetY,
      left: calcedPosition.left + this.config.core.icibaCircleOffsetX,
    }
  }

  private removeSelection() {
    const selection = window.getSelection()
    if (!selection) {
      return
    }
    selection.removeAllRanges()
  }

  public get computedStyle() {
    return {
      ...this.internalStyle,
      zIndex: this.zIndex,
      width: `${this.$store.config.core.icibaCircleSize}px`,
      height: `${this.$store.config.core.icibaCircleSize}px`,
    }
  }

  /* eslint-disable @typescript-eslint/member-ordering */
  @Watch('style')
  protected onStyleChange() {
    const init: IcibaPositionStyle = {}
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
