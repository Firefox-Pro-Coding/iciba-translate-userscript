import { defineComponent, watch, onUnmounted } from '@vue/composition-api'

import { providerOptions, PROVIDER } from '~/constants/constant'
import { store } from '~/service/store'

import ProviderSort from './providerSort/providerSort.vue'

export default defineComponent({
  name: 'CoreSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderSort,
  },
  setup: (props) => {
    const form = store.config.core
    let reset: Array<PROVIDER> | null = null

    watch(() => [
      form.defaultProvider,
      form.icibaCircleRightClickProvider,
    ], (n, o) => {
      reset = o && n[0] === n[1]
        ? o
        : null
    })

    const doReset = () => {
      if (props.active && reset) {
        form.defaultProvider = reset[0]
        form.icibaCircleRightClickProvider = reset[1]
      }
    }

    watch(() => props.active, doReset, { lazy: true })
    onUnmounted(doReset)

    return {
      form,
      providerOptions,
    }
  },
})
