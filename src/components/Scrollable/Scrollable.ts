import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import getScrollBarWidth from '~/util/scrollbar-width'

@Component({
  name: 'IScrollable',
})
export default class IScrollable extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  public scrollBarStyle!: object

  @Prop({ type: Object, default: () => ({}) })
  public noScrollBarStyle!: object

  public $refs!: {
    container: HTMLDivElement
  }

  public drag = {
    start: false,
    startY: 0,
    startScrollTop: 0,
  }
  public noScrollBar = true
  public scrollbar = {
    track: {
      top: 0,
    },
    thumb: {
      size: '0',
      position: '0',
    },
  }
  public scrollbarWidth = getScrollBarWidth()

  public mounted() {
    const container = this.$refs.container

    container.addEventListener('scroll', this.calcScrollbar, false)
    container.addEventListener('resize', this.calcScrollbar, false)
    container.addEventListener('mouseenter', this.calcScrollbar, false)
    window.addEventListener('resize', this.calcScrollbarWidth, false)
    window.addEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.addEventListener('mouseup', this.handleScrollbarThumbMouseup, false)

    this.calcScrollbar()
  }

  public beforeDestroy() {
    const container = this.$refs.container

    container.removeEventListener('scroll', this.calcScrollbar, false)
    container.removeEventListener('resize', this.calcScrollbar, false)
    container.removeEventListener('mouseenter', this.calcScrollbar, false)
    window.removeEventListener('resize', this.calcScrollbarWidth, false)
    window.removeEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.removeEventListener('mouseup', this.handleScrollbarThumbMouseup, false)
  }

  public updated() {
    this.calcScrollbar()
  }

  public scrollToTop() {
    this.$refs.container.scrollTop = 0
  }

  protected calcScrollbarWidth() {
    this.scrollbarWidth = getScrollBarWidth()
  }

  protected handleScrollbarThumbClick(e: MouseEvent) {
    e.preventDefault()
    this.drag.start = true
    this.drag.startY = e.clientY
    this.drag.startScrollTop = this.$refs.container.scrollTop
  }

  protected handleScrollbarThumbMousemove(e: MouseEvent) {
    if (this.drag.start) {
      e.preventDefault()

      const {
        scrollHeight,
        clientHeight,
      } = this.$refs.container

      const scrollSpacePixel = scrollHeight - clientHeight
      const mouseMovePixel = e.clientY - this.drag.startY
      const moveDeltaPercentage = mouseMovePixel / clientHeight
      const scrollDelta = scrollHeight * moveDeltaPercentage
      let destScrollTop = this.drag.startScrollTop + scrollDelta
      if (destScrollTop > scrollSpacePixel) {
        destScrollTop = scrollSpacePixel
      }
      if (destScrollTop < 0) {
        destScrollTop = 0
      }

      this.$refs.container.scrollTop = destScrollTop
    }
  }

  protected handleScrollbarThumbMouseup() {
    this.drag.start = false
  }

  private calcScrollbar() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = this.$refs.container

    const sizePercentage = clientHeight / scrollHeight
    const avaliableScrollSpace = scrollHeight - clientHeight
    const currentScrollPercentage = scrollTop / avaliableScrollSpace

    const thumbMaxHeightPercentage = 1 - sizePercentage
    const thumbTop = thumbMaxHeightPercentage * currentScrollPercentage * 100

    this.noScrollBar = sizePercentage >= 1

    const thumbSize = (sizePercentage * 100).toFixed(4)
    const thumbPosition = thumbTop.toFixed(4)

    // prevent infinite update
    if (this.scrollbar.track.top !== scrollTop) {
      this.scrollbar.track.top = scrollTop
    }
    if (this.scrollbar.thumb.size !== thumbSize) {
      this.scrollbar.thumb.size = thumbSize
    }
    if (this.scrollbar.thumb.position !== thumbPosition) {
      this.scrollbar.thumb.position = thumbPosition
    }
  }

  protected get scrollbarStyle() {
    return {
      track: {
        top: `${this.scrollbar.track.top}px`,
      },
      thumb: {
        height: `${this.scrollbar.thumb.size}%`,
        top: `${this.scrollbar.thumb.position}%`,
      },
    }
  }

  protected get scrollBoxStyle() {
    return {
      'margin-right': `${-this.scrollbarWidth}px`,
    }
  }

  protected get contentWrapperStyle() {
    return {
      ...(
        this.noScrollBar
          ? { ...this.noScrollBarStyle }
          : { ...this.scrollBarStyle }
      ),
    }
  }
}
