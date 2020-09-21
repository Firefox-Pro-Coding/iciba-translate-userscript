import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  computed,
  reactive,
  ref,
} from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { scrollBarWidthService } from '~/service/scrollBarWidth'

export default defineComponent({
  setup: (props) => {
    const refs = {
      container: ref<HTMLDivElement>(),
      scrollBox: ref<HTMLDivElement>(),
    }

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
      if (!refs.container.value) {
        return
      }
      state.drag.start = true
      state.drag.startY = e.clientY
      state.drag.startScrollTop = refs.container.value.scrollTop
    }

    const handleScrollbarThumbMousemove = (e: MouseEvent) => {
      if (!refs.container.value) {
        return
      }
      if (state.drag.start) {
        e.preventDefault()

        const {
          scrollHeight,
          clientHeight,
        } = refs.container.value

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

        refs.container.value.scrollTop = destScrollTop
      }
    }

    const handleScrollbarThumbMouseup = () => {
      state.drag.start = false
    }

    const calcScrollbar = () => {
      if (!refs.container.value) {
        return
      }
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = refs.container.value

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

    const thumbStyle = computed(() => ({
      height: `${state.scrollbar.thumb.size}%`,
      top: `${state.scrollbar.thumb.position}%`,
    }))

    const scrollBoxStyle = computed(() => ({
      'margin-right': `${-scrollBarWidthService.state.scrollBarWidth}px`,
    }))

    onMounted(() => {
      window.addEventListener('mousemove', handleScrollbarThumbMousemove, false)
      window.addEventListener('mouseup', handleScrollbarThumbMouseup, false)

      const ro = new ResizeObserver(calcScrollbar)
      window.setTimeout(() => {
        if (refs.container.value) {
          ro.observe(refs.container.value)
        }
        if (refs.scrollBox.value) {
          ro.observe(refs.scrollBox.value)
        }
      })

      calcScrollbar()

      onUnmounted(() => {
        window.removeEventListener('mousemove', handleScrollbarThumbMousemove, false)
        window.removeEventListener('mouseup', handleScrollbarThumbMouseup, false)
        ro.disconnect()
      })
    })

    onUpdated(() => {
      calcScrollbar()
    })

    return {
      state,
      refs,
      props,
      thumbStyle,
      scrollBoxStyle,
      calcScrollbar,
      handleScrollbarThumbClick,
    }
  },
})
