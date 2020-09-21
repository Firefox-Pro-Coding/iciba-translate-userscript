import { defineComponent, reactive, onMounted, h, nextTick } from 'vue'
import { bus, EVENTS } from '~/service/globalBus'

export const lazyLoadHoc = (Component: any, event: EVENTS | Array<EVENTS>) => defineComponent({
  name: `LazyLoadHoc${Component.name ? `_${Component.name as string}` : ''}`,
  setup: (_props, setupContext) => {
    const state = reactive({
      load: false,
    })

    onMounted(() => {
      const events = Array.isArray(event) ? event : [event]
      const cb = (action: any) => {
        if (state.load) {
          return
        }

        state.load = true
        events.forEach((e) => {
          bus.off({
            event: e,
            listener: cb,
          })
        })
        nextTick(() => {
          bus.emit(action)
        })
      }

      events.forEach((e) => {
        bus.on({
          event: e,
          listener: cb,
        })
      })
    })
    return () => state.load && h(Component, {
      props: setupContext.attrs,
    })
  },
})
