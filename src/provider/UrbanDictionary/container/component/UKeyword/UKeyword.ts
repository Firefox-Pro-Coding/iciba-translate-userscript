import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import urbanBus from '../../bus'
import bus from '~/bus/bus'

@Component({
  name: 'UrbanDictionaryKeyword',
})
export default class UrbanDictionaryKeyword extends Vue {
  public $refs!: {
    span: HTMLSpanElement
  }

  @Prop({ type: String, default: '' })
  public content!: string

  public id = 0

  public visible = false
  public visibleTimeout = 0

  public mounted() {
    this.id = urbanBus.genId()
  }

  protected handleClick() {
    bus.emit(bus.events.URBAN_DICTIONAR_TOOLTIP_CLICK, this.content)
  }

  protected showTooltip() {
    if (this.visibleTimeout) {
      window.clearTimeout(this.visibleTimeout)
    }

    this.visibleTimeout = window.setTimeout(() => {
      this.visible = true
    }, 200)
  }

  protected hideTooltip() {
    window.clearTimeout(this.visibleTimeout)
    this.visibleTimeout = 0
    this.visible = false
  }

  @Watch('visible')
  protected visibleChange() {
    if (this.visible) {
      const rect = this.$refs.span.getBoundingClientRect()
      urbanBus.emit(urbanBus.events.SHOW_TOOLTIP, {
        top: rect.bottom,
        left: rect.right,
        id: this.id,
        text: this.content,
      })
    } else {
      urbanBus.emit(urbanBus.events.HIDE_TOOLTIP, { id: this.id })
    }
  }
}
