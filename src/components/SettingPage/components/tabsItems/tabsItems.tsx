import Vue from 'vue'
import { defineComponent, reactive, watch, onMounted } from '@vue/composition-api'

interface WindowStyle {
  position: string
  transform: string
  display: string
  animating: boolean
}

export default defineComponent({
  model: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
    windowClass: {
      type: String,
    },
  },
  setup: (props, setupContext) => {
    const $refs: {
      window: Array<HTMLDivElement>
      windowContainer: HTMLDivElement
      container: HTMLDivElement
    } = setupContext.refs

    const state = reactive({
      beforeValue: 0,
      height: 0,
      animating: false,
      animatingTimeout: 0,
      windowStyle: [] as Array<WindowStyle>,
      scrollTopInterupt: null as null | (() => void),
    })

    const scrollToTop = () => {
      const start = $refs.container.scrollTop
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
        if ($refs.container.scrollTop === 0) {
          return
        }
        $refs.container.scrollTop = start - ease(time / 300) * start
        window.requestAnimationFrame(scroll)
      }
      state.scrollTopInterupt = () => {
        stop = true
        state.scrollTopInterupt = null
      }
      window.requestAnimationFrame(scroll)
    }

    const transform = async () => {
      if (state.animating) {
        window.clearTimeout(state.animatingTimeout)
      }

      state.animating = true

      // before animate state
      const outIndex = state.beforeValue
      const inIndex = props.value

      const containerHeight = $refs.windowContainer.getBoundingClientRect().height

      // reset style
      state.windowStyle.forEach((v) => {
        v.display = 'none'
        v.position = ''
        v.transform = ''
      })

      state.height = Math.max(
        $refs.window[outIndex].getBoundingClientRect().height,
        containerHeight,
      )

      // set pre position
      Vue.set(state.windowStyle, outIndex, {
        position: 'absolute',
        display: '',
        transform: '',
        animating: false,
      })
      Vue.set(state.windowStyle, inIndex, {
        position: 'absolute',
        display: '',
        transform: inIndex < outIndex
          ? 'translate(-100%, 0)'
          : 'translate(100%, 0)',
        animating: false,
      })

      // await render
      await new Promise<void>((rs) => Vue.nextTick(rs))

      scrollToTop()

      state.height = Math.max(
        $refs.window[outIndex].getBoundingClientRect().height,
        containerHeight,
      )

      Vue.set(state.windowStyle, outIndex, {
        position: 'absolute',
        display: '',
        transform: outIndex < inIndex
          ? 'translate(-100%, 0)'
          : 'translate(100%, 0)',
        animating: true,
      })
      Vue.set(state.windowStyle, inIndex, {
        position: 'absolute',
        display: '',
        transform: '',
        animating: true,
      })

      state.animatingTimeout = window.setTimeout(() => {
        state.animating = false

        Vue.set(state.windowStyle, outIndex, {
          position: '',
          display: 'none',
          transform: '',
          animating: false,
        })
        Vue.set(state.windowStyle, inIndex, {
          position: '',
          display: '',
          transform: '',
          animating: false,
        })
        state.height = 0
      }, 300)
    }

    const initStyle = (length: number) => {
      if (length === state.windowStyle.length) {
        return
      }
      state.windowStyle = Array(length).fill(0).map((_v, i) => ({
        position: '',
        transform: '',
        display: props.value === i ? '' : 'none',
        animating: false,
      }))
    }

    onMounted(() => {
      watch(() => props.value, (_value: number, old: number | undefined) => {
        state.beforeValue = old ?? 0
        if (old !== undefined) {
          transform()
        }
      })
    })

    return () => {
      const VNodes = setupContext.slots.default()
      initStyle(VNodes.length)
      return (
        <div class='i-tabs-items' ref='container'>
          <div
            class='window-container flex relative ease-in-out duration-300'
            ref="windowContainer"
            style={{ height: state.height ? `${state.height}px` : 'auto' }}
          >
            { ...VNodes.map((v, i) => {
              if (v.componentOptions?.propsData) {
                const pd: any = v.componentOptions.propsData
                pd.index = i
                pd.current = props.value
              }
              return (
                <div
                  refInFor={true}
                  ref='window'
                  style={state.windowStyle[i]}
                  key={i}
                  class={{
                    [props.windowClass ?? '']: true,
                    'vnode-window': true,
                    'animating': state.windowStyle[i].animating,
                  }}
                >
                  { v }
                </div>
              )
            }) }
          </div>
        </div>
      )
    }
  },
})
