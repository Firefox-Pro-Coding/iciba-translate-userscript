import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import getScrollBarWidth from '~/util/scrollbar-width'

@Component({
  name: 'IcibaSrollbarContainer',
})
export default class IcibaSrollbarContainer extends Vue {
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

    container.addEventListener('scroll', this.scrollBarListener, false)
    container.addEventListener('resize', this.scrollBarListener, false)
    container.addEventListener('mouseenter', this.scrollBarListener, false)
    window.addEventListener('resize', this.calcScrollbarWidth, false)
    window.addEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.addEventListener('mouseup', this.handleScrollbarThumbMouseup, false)

    this.scrollBarListener()
  }

  public beforeDestroy() {
    const container = this.$refs.container

    container.removeEventListener('scroll', this.scrollBarListener, false)
    container.removeEventListener('resize', this.scrollBarListener, false)
    container.removeEventListener('mouseenter', this.scrollBarListener, false)
    window.removeEventListener('resize', this.calcScrollbarWidth, false)
    window.removeEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.removeEventListener('mouseup', this.handleScrollbarThumbMouseup, false)
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

  protected handleScroll(e: WheelEvent) {
    const scrollBox = this.$refs.container
    if (scrollBox) {
      // scroll down
      if (e.deltaY > 0 && scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.clientHeight) {
        e.preventDefault()
      }

      // scroll up
      if (e.deltaY < 0 && scrollBox.scrollTop === 0) {
        e.preventDefault()
      }
    }
  }

  private scrollBarListener() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = this.$refs.container

    const sizePercentage = clientHeight / scrollHeight
    const avaliableScrollSpace = scrollHeight - clientHeight
    const currentScrollPercentage = scrollTop / avaliableScrollSpace

    // console.log(currentScrollPercentage)

    const thumbMaxHeightPercentage = 1 - sizePercentage
    const thumbTop = thumbMaxHeightPercentage * currentScrollPercentage * 100

    this.noScrollBar = sizePercentage === 1

    this.scrollbar.track = {
      top: scrollTop,
    }
    this.scrollbar.thumb = {
      size: (sizePercentage * 100).toFixed(4),
      position: thumbTop.toFixed(4),
    }
  }

  public get scrollbarStyle() {
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
}
