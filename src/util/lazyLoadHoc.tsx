import Vue from 'vue'
import { createComponent, reactive, onMounted, createElement } from '@vue/composition-api'
import { bus, EVENTS } from '~/service/globalBus'

export const lazyLoadHoc = (Component: any, event: EVENTS) => createComponent({
  name: `LazyLoadHoc${Component.name ? `_${Component.name as string}` : ''}`,
  setup: (_props, setupContext) => {
    const state = reactive({
      load: false,
    })

    onMounted(() => {
      const cb = (action: any) => {
        if (state.load) {
          return
        }
        state.load = true
        Vue.nextTick(() => {
          bus.emit(action)
        })
      }
      bus.on(event as any, cb)
    })
    return () => state.load && createElement(Component, {
      props: setupContext.attrs,
    })
  },
})
