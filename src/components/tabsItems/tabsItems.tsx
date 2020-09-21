import { defineComponent, reactive, watch, onMounted, ref, nextTick, CSSProperties } from 'vue'

type WindowState = Pick<CSSProperties, 'position' | 'transform' | 'display'> & {
  animating: boolean
}

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    windowClass: {
      type: String,
    },
  },
  setup: (props, ctx) => {
    const refs = {
      windows: reactive([] as Array<HTMLDivElement>),
      windowContainer: ref<HTMLDivElement>(),
      container: ref<HTMLDivElement>(),
    }

    const state = reactive({
      beforeValue: 0,
      height: 0,
      animating: false,
      animatingTimeout: 0,
      windowState: [] as Array<WindowState>,
      scrollTopInterupt: null as null | (() => void),
    })

    const scrollToTop = () => {
      const container = refs.container.value
      if (!container) {
        return
      }
      const start = container.scrollTop
      if (!start) {
        return
      }
      if (state.scrollTopInterupt) {
        state.scrollTopInterupt()
      }
      const startTime = performance.now()
      const ease = (pos: number) => (Math.cos(Math.PI * pos) - 1) * -0.5
      let stop = false
      const scroll = () => {
        const time = performance.now() - startTime
        if (time > 300 || stop) {
          return
        }
        if (container.scrollTop === 0) {
          return
        }
        container.scrollTop = start - ease(time / 300) * start
        window.requestAnimationFrame(scroll)
      }
      state.scrollTopInterupt = () => {
        stop = true
        state.scrollTopInterupt = null
      }
      window.requestAnimationFrame(scroll)
    }

    const transform = async () => {
      const windowContainer = refs.windowContainer.value
      const windows = refs.windows

      if (!windowContainer || !windows) {
        return
      }

      if (state.animating) {
        window.clearTimeout(state.animatingTimeout)
      }

      state.animating = true

      // before animate state
      const outIndex = state.beforeValue
      const inIndex = props.modelValue

      const containerHeight = windowContainer.getBoundingClientRect().height

      // reset style
      state.windowState.forEach((v) => {
        v.display = 'none'
        v.position = undefined
        v.transform = ''
      })

      state.height = Math.max(
        windows[outIndex].getBoundingClientRect().height,
        containerHeight,
      )

      // set pre position
      state.windowState[outIndex] = {
        position: 'absolute',
        display: '',
        transform: '',
        animating: false,
      }
      state.windowState[inIndex] = {
        position: 'absolute',
        display: '',
        transform: inIndex < outIndex
          ? 'translate(-100%, 0)'
          : 'translate(100%, 0)',
        animating: false,
      }

      // await render
      await new Promise<void>((rs) => nextTick(rs))

      scrollToTop()

      state.height = Math.max(
        windows[outIndex].getBoundingClientRect().height,
        containerHeight,
      )

      state.windowState[outIndex] = {
        position: 'absolute',
        display: '',
        transform: outIndex < inIndex
          ? 'translate(-100%, 0)'
          : 'translate(100%, 0)',
        animating: true,
      }

      state.windowState[inIndex] = {
        position: 'absolute',
        display: '',
        transform: '',
        animating: true,
      }

      state.animatingTimeout = window.setTimeout(() => {
        state.animating = false

        state.windowState[outIndex] = {
          position: undefined,
          display: 'none',
          transform: '',
          animating: false,
        }
        state.windowState[inIndex] = {
          position: undefined,
          display: '',
          transform: '',
          animating: false,
        }
        state.height = 0
      }, 300)
    }

    const initStyle = (length: number) => {
      if (length === state.windowState.length) {
        return
      }
      state.windowState = Array(length).fill(0).map((_v, i) => ({
        position: undefined,
        transform: '',
        display: props.modelValue === i ? '' : 'none',
        animating: false,
      }))
    }

    onMounted(() => {
      watch(
        () => props.modelValue,
        (_value: number, old: number | undefined) => {
          state.beforeValue = old ?? 0
          if (old !== undefined) {
            transform()
          }
        },
        { immediate: true },
      )
    })

    return () => {
      const VNodes = ctx.slots.default?.() ?? []
      initStyle(VNodes.length)
      return (
        <div class="i-tabs-items" ref={refs.container}>
          <div
            class="window-container flex relative ease-in-out duration-300"
            ref={refs.windowContainer}
            style={{ height: state.height ? `${state.height}px` : 'auto' }}
          >
            {...VNodes.map((vnode, i) => {
              if (vnode.props) {
                const pd: any = vnode.props
                pd.index = i
                pd.current = props.modelValue
              }
              return (
                <div
                  ref={(el) => { if (el) refs.windows[i] = el as HTMLDivElement }}
                  style={{
                    position: state.windowState[i].position,
                    display: state.windowState[i].display,
                    transform: state.windowState[i].transform,
                  }}
                  key={i}
                  class={{
                    [props.windowClass ?? '']: true,
                    'vnode-window': true,
                    'animating': state.windowState[i].animating,
                  }}
                >
                  {vnode}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  },
})
