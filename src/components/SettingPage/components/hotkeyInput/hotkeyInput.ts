import {
  defineComponent,
  onUnmounted,
  reactive,
  computed,
  onMounted,
  watch,
} from '@vue/composition-api'

interface Props {
  value?: Array<string>
}

export default defineComponent({
  name: 'HotkeyInput',
  props: {
    value: null,
  },
  setup: (props: Props, ctx) => {
    const state = reactive({
      keys: [] as Array<string>,
      setKeys: [] as Array<string>,
    })

    const normalizeKey = (key: string) => (key >= 'a' && key <= 'z'
      ? key.toUpperCase()
      : key)

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key)
      if (e.repeat) {
        return
      }

      if (key === 'Backspace') {
        state.keys = []
        state.setKeys = []
        return
      }

      if (!state.keys.includes(key)) {
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

    const handleClear = () => {
      state.keys = []
    }

    const input = computed(() => {
      const keys = state.setKeys
      const hasCtrl = keys.includes('Control')
      const hasAlt = keys.includes('Alt')
      const hasShift = keys.includes('Shift')

      const inputs = [
        hasCtrl && 'Control',
        hasAlt && 'Alt',
        hasShift && 'Shift',
        ...keys.filter((v) => !['Control', 'Alt', 'Shift'].includes(v)),
      ].filter(Boolean)

      return inputs
    })

    const inputString = computed(() => {
      if (!input.value.length) {
        return '无'
      }
      return input.value
        .map((v) => (v === 'Control' ? 'Ctrl' : v))
        .join(' + ')
    })

    watch(() => input.value, () => {
      ctx.emit('input', input.value)
    })

    watch(() => props.value, () => {
      if (!props.value) {
        return
      }
      if (props.value.every((v, i) => v === state.setKeys[i])) {
        return
      }
      state.setKeys = [...props.value]
    })

    onMounted(() => {
      window.addEventListener('keyup', handleKeyUp)
      window.addEventListener('blur', handleClear)
      window.addEventListener('focus', handleClear)
    })

    onUnmounted(() => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleClear)
      window.removeEventListener('focus', handleClear)
    })

    return {
      props,
      state,
      inputString,
      handleKeyDown,
      handleKeyUp,
    }
  },
})
