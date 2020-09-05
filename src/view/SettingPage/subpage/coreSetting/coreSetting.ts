import { defineComponent, watch, onUnmounted, reactive, computed, onMounted } from '@vue/composition-api'

import { providerOptions, PROVIDER } from '~/constants/constant'
import { store } from '~/service/store'

import Foldable from '~/components/Foldable/Foldable.vue'
import ProviderSort from './providerSort/providerSort.vue'

export default defineComponent({
  name: 'CoreSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderSort,
    Foldable,
  },
  setup: (props) => {
    const state = reactive({
      keys: [] as Array<string>,
      setKeys: [] as Array<string>,
    })
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

    const normalizeKey = (key: string) => (key >= 'a' && key <= 'z'
      ? key.toUpperCase()
      : key)

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key)
      if (!e.repeat && !state.keys.includes(key)) {
        state.keys.push(key)
      }
      state.setKeys = [...state.keys]
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key)
      const index = state.keys.indexOf(key)
      if (index !== -1) {
        state.keys.splice(index, 1)
      }
    }

    watch(() => props.active, doReset)
    onUnmounted(doReset)

    const input = computed(() => {
      const keys = state.setKeys
      const hasCtrl = keys.includes('Control')
      const hasAlt = keys.includes('Alt')
      const hasShift = keys.includes('Shift')

      const inputs = [
        hasCtrl && 'Ctrl',
        hasAlt && 'Alt',
        hasShift && 'Shift',
        ...keys
          .filter((v) => !['Control', 'Alt', 'Shift'].includes(v))
          .map((v) => v.toUpperCase()),
      ].filter(Boolean)

      return inputs.join(' + ')
    })

    onMounted(() => {
      window.addEventListener('keyup', handleKeyUp)
    })

    onUnmounted(() => {
      window.removeEventListener('keyup', handleKeyUp)
    })

    return {
      state,
      input,
      form,
      providerOptions,
      handleKeyDown,
      handleKeyUp,
    }
  },
})
