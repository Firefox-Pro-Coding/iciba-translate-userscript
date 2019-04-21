import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { IcibaPositionStyle, IcibaStyle } from '~/types/index'
import sleep from '~/util/sleep'
import zgen from '~/util/zIndexGenerator'

import bus, { IcibaCircleClickTranslatePayload } from '~/bus/bus'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

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
    window.addEventListener('mouseup', this.handleWindowMouseUp, false)
    this.shadowRoot.addEventListener('mouseup', this.handleShadowRootMouseUp, false)
  }

  public destroyed() {
    window.removeEventListener('mouseup', this.handleWindowMouseUp, false)
    this.shadowRoot.removeEventListener('mouseup', this.handleShadowRootMouseUp, false)
  }

  protected handleMouseUp(event: MouseEvent) {
    const payload: IcibaCircleClickTranslatePayload = {
      word: this.word,
      event,
    }

    // have to wait handleContextmenu trigger
    setTimeout(() => {
      this.visible = false
      bus.emit(bus.events.ICIBA_MAIN_PREPARE_TRANSLATE, payload)
    })
  }

  protected handleMouseover(event: MouseEvent) {
    if (!this.config.core.mouseOverTranslate) {
      return
    }

    this.visible = false
    const payload: IcibaCircleClickTranslatePayload = {
      word: this.word,
      event,
    }
    bus.emit(bus.events.ICIBA_MAIN_PREPARE_TRANSLATE, payload)
  }

  protected async handleWindowMouseUp(e: MouseEvent) {
    if (!this.visible) {
      this.show(e)
      return
    }

    // outside shadow-root
    if (e.target !== this.icibaRoot) {
      this.visible = false
    }
  }

  protected async handleShadowRootMouseUp(_e: Event) {
    const e: MouseEvent = _e as any

    const ignoreConditions = [
      // click on it self
      e.target === this.$el,
    ]

    if (ignoreConditions.some(v => v)) {
      return
    }

    this.visible = false
  }

  private async show(e: MouseEvent) {
    await sleep(10)
    if (this.config.core.pressCtrlToShowCircle && !e.ctrlKey) {
      return
    }

    const selection = window.getSelection()
    if (!selection) {
      return
    }
    const selectionString = selection.toString().trim()
    // only show button if selection is valid
    if (!selectionString.length) {
      this.visible = false
      return
    }

    if (this.config.core.selectionMaxLengthCut) {
      if (selectionString.length > this.config.core.selectionMaxLength) {
        return
      }
    }

    this.visible = true
    this.word = selectionString
    this.zIndex = zgen()

    const calcedPosition = calcMouseEventPosition(e)

    this.style = {
      top: calcedPosition.top + this.config.core.icibaCircleOffsetY,
      left: calcedPosition.left + this.config.core.icibaCircleOffsetX,
    }
  }

  public get computedStyle() {
    return {
      ...this.internalStyle,
      zIndex: this.zIndex,
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
