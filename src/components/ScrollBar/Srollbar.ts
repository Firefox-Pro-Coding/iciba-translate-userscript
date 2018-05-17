import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'IcibaSrollbarContainer',
})
export default class App extends Vue {
  public container: HTMLElement = null as any as HTMLElement
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

  public mounted() {
    this.container = this.$refs.container as HTMLElement
    this.container.addEventListener('scroll', this.scrollBarListener, false)
    this.container.addEventListener('resize', this.scrollBarListener, false)
    this.container.addEventListener('mouseenter', this.scrollBarListener, false)
    window.addEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.addEventListener('mouseup', this.handleScrollbarThumbMouseup, false)
  }

  public beforeDestroy() {
    this.container.addEventListener('scroll', this.scrollBarListener, false)
    this.container.addEventListener('resize', this.scrollBarListener, false)
    this.container.addEventListener('mouseenter', this.scrollBarListener, false)
  }

  public handleScrollbarThumbClick(e: MouseEvent) {
    e.preventDefault()
    this.drag.start = true
    this.drag.startY = e.clientY
    this.drag.startScrollTop = this.container.scrollTop
  }

  public handleScrollbarThumbMousemove(e: MouseEvent) {
    if (this.drag.start) {
      e.preventDefault()

      const {
        scrollHeight,
        clientHeight,
      } = this.container

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

      this.container.scrollTop = destScrollTop
    }
  }

  public handleScrollbarThumbMouseup() {
    this.drag.start = false
  }

  private scrollBarListener() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = this.container

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
}
