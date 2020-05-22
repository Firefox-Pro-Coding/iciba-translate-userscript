import Vue from 'vue'
import { defineComponent, reactive, onMounted, createElement } from '@vue/composition-api'
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
        Vue.nextTick(() => {
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
    return () => state.load && createElement(Component, {
      props: setupContext.attrs,
    })
  },
})
