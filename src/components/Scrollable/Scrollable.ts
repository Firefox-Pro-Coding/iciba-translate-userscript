import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  computed,
  reactive,
} from '@vue/composition-api'
import ResizeObserver from 'resize-observer-polyfill'
import { scrollBarWidthService } from '~/service/scrollBarWidth'

export default defineComponent({
  setup: (props, setupContext) => {
    const $refs: {
      container: HTMLDivElement
      scrollBox: HTMLDivElement
    } = setupContext.refs

    const state = reactive({
      drag: {
        start: false,
        startY: 0,
        startScrollTop: 0,
      },
      noScrollBar: true,
      scrollbar: {
        track: {
          top: 0,
        },
        thumb: {
          size: '0',
          position: '0',
        },
      },
    })

    const handleScrollbarThumbClick = (e: MouseEvent) => {
      e.preventDefault()
      state.drag.start = true
      state.drag.startY = e.clientY
      state.drag.startScrollTop = $refs.container.scrollTop
    }

    const handleScrollbarThumbMousemove = (e: MouseEvent) => {
      if (state.drag.start) {
        e.preventDefault()

        const {
          scrollHeight,
          clientHeight,
        } = $refs.container

        const scrollSpacePixel = scrollHeight - clientHeight
        const mouseMovePixel = e.clientY - state.drag.startY
        const moveDeltaPercentage = mouseMovePixel / clientHeight
        const scrollDelta = scrollHeight * moveDeltaPercentage
        let destScrollTop = state.drag.startScrollTop + scrollDelta
        if (destScrollTop > scrollSpacePixel) {
          destScrollTop = scrollSpacePixel
        }
        if (destScrollTop < 0) {
          destScrollTop = 0
        }

        $refs.container.scrollTop = destScrollTop
      }
    }

    const handleScrollbarThumbMouseup = () => {
      state.drag.start = false
    }

    const calcScrollbar = () => {
      if (!$refs.container) {
        return
      }
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = $refs.container

      const sizePercentage = clientHeight / scrollHeight
      const avaliableScrollSpace = scrollHeight - clientHeight
      const currentScrollPercentage = scrollTop / avaliableScrollSpace

      const thumbMaxHeightPercentage = 1 - sizePercentage
      const thumbTop = thumbMaxHeightPercentage * currentScrollPercentage * 100

      state.noScrollBar = sizePercentage >= 1

      const thumbSize = (sizePercentage * 100).toFixed(4)
      const thumbPosition = thumbTop.toFixed(4)

      // prevent infinite update
      if (state.scrollbar.track.top !== scrollTop) {
        state.scrollbar.track.top = scrollTop
      }
      if (state.scrollbar.thumb.size !== thumbSize) {
        state.scrollbar.thumb.size = thumbSize
      }
      if (state.scrollbar.thumb.position !== thumbPosition) {
        state.scrollbar.thumb.position = thumbPosition
      }
    }

    const computedScrollBarStyle = computed(() => ({
      track: {
        top: `${state.scrollbar.track.top}px`,
      },
      thumb: {
        height: `${state.scrollbar.thumb.size}%`,
        top: `${state.scrollbar.thumb.position}%`,
      },
    }))

    const scrollBoxStyle = computed(() => ({
      'margin-right': `${-scrollBarWidthService.state.scrollBarWidth}px`,
    }))

    onMounted(() => {
      window.addEventListener('mousemove', handleScrollbarThumbMousemove, false)
      window.addEventListener('mouseup', handleScrollbarThumbMouseup, false)

      const ro = new ResizeObserver(calcScrollbar)
      window.setTimeout(() => {
        if ($refs.container) {
          ro.observe($refs.container)
        }
        if ($refs.scrollBox) {
          ro.observe($refs.scrollBox)
        }
      })

      calcScrollbar()
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleScrollbarThumbMousemove, false)
      window.removeEventListener('mouseup', handleScrollbarThumbMouseup, false)
    })

    onUpdated(() => {
      calcScrollbar()
    })

    return {
      state,
      props,
      computedScrollBarStyle,
      scrollBoxStyle,
      calcScrollbar,
      handleScrollbarThumbClick,
    }
  },
})
