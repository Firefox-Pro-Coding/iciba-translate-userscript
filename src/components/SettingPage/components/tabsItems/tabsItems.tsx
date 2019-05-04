import Vue from 'vue'
import { Component, Model, Watch } from 'vue-property-decorator'

interface WindowStyle {
  position: string
  transform: string
  display: string
}

@Component({
  name: 'ITabsItems',
  components: {
  },
})
export default class ITabsItems extends Vue {
  public $refs!: {
    window: Array<HTMLDivElement>
    windowContainer: HTMLDivElement
    container: HTMLDivElement
  }

  @Model('input', { type: Number, default: 0 })
  public value!: number

  private beforeValue = 0
  private height = 0
  private animating = false
  private animatingTimeout = 0
  private windowStyle: Array<WindowStyle> = []
  private scrollTopInterupt: null | (() => void) = null


  private async transform() {
    if (this.animating) {
      // clean up last animation
      window.clearTimeout(this.animatingTimeout)
      this.windowStyle.forEach((v, i) => {
        if (this.beforeValue === i) {
          v.display = 'none'
          v.position = ''
          v.transform = ''
        } else {
          v.display = 'none'
          v.position = ''
          v.transform = ''
        }
      })
    }

    this.animating = true
    // before animate state
    const windowContainerHeight = this.$refs.windowContainer.getBoundingClientRect().height
    const beforeValue = this.beforeValue
    const value = this.value
    this.height = Math.max(
      this.$refs.window[beforeValue].getBoundingClientRect().height,
      windowContainerHeight,
    )
    this.windowStyle[beforeValue].position = 'absolute'
    this.windowStyle[value].position = 'absolute'
    this.windowStyle[value].display = ''
    this.windowStyle[beforeValue].transform = ''
    this.windowStyle[value].transform = value < beforeValue
      ? 'translate(-100%, 0)'
      : 'translate(100%, 0)'

    await new Promise(rs => this.$nextTick(() => rs()))

    this.scrollToTop()
    this.height = Math.max(
      this.$refs.window[beforeValue].getBoundingClientRect().height,
      windowContainerHeight,
    )
    this.windowStyle[beforeValue].transform = beforeValue < value
      ? 'translate(-100%, 0)'
      : 'translate(100%, 0)'
    this.windowStyle[value].transform = ''

    this.animatingTimeout = window.setTimeout(() => {
      this.animating = false
      this.windowStyle[beforeValue].position = ''
      this.windowStyle[value].position = ''
      this.windowStyle[beforeValue].transform = ''
      this.windowStyle[value].transform = ''
      this.windowStyle[beforeValue].display = 'none'
      this.height = 0
    }, 300)
  }

  private scrollToTop() {
    const start = this.$refs.container.scrollTop
    if (!start) {
      return
    }
    if (this.scrollTopInterupt) {
      this.scrollTopInterupt()
    }
    const startTime = performance.now()
    const ease = (pos: number) => ((Math.cos(Math.PI * pos) - 1) * -0.5)
    let stop = false
    const scroll = () => {
      const time = performance.now() - startTime
      if (time > 300 || stop) {
        return
      }
      if (this.$refs.container.scrollTop === 0) {
        return
      }
      this.$refs.container.scrollTop = start - ease(time / 300) * start
      window.requestAnimationFrame(scroll)
    }
    this.scrollTopInterupt = () => {
      stop = true
      this.scrollTopInterupt = null
    }
    window.requestAnimationFrame(scroll)
  }

  private initStyle(length: number) {
    if (length === this.windowStyle.length) {
      return
    }
    this.windowStyle = Array(length).fill(0).map((_v, i) => ({
      position: '',
      transform: '',
      display: this.value === i ? '' : 'none',
    }))
  }

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Watch('value')
  public valueChange(_new: number, old: number) {
    this.beforeValue = old
    this.transform()
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public render() {
    const defaultSlot = this.$slots.default ? this.$slots.default : []
    const VNodes = defaultSlot.filter(v => v.componentOptions && v.componentOptions.tag === 'i-tab-item')
    this.initStyle(VNodes.length)
    return (
      <div class='i-tabs-items' ref='container'>
        <div
          ref="windowContainer"
          class='window-container flex'
          style={{ height: this.height ? `${this.height}px` : 'auto' }}>
          { ...VNodes.map((v, i) => (
            <div
              refInFor={true}
              ref='window'
              style={this.windowStyle[i]}
              class='vnode-window'>
              { v }
            </div>
          )) }
        </div>
      </div>
    )
  }
}
