import {
  defineComponent,
  onUnmounted,
  reactive,
  computed,
  onMounted,
  watch,
} from '@vue/composition-api'

const normalizeKey = (key: string) => (key >= 'a' && key <= 'z'
  ? key.toUpperCase()
  : key)

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
      keys: props.value ?? [] as Array<string>,
      setKeys: [] as Array<string>,
    })

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

    const sortedKeys = computed(() => {
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

    const inputDisplayString = computed(() => {
      if (!sortedKeys.value.length) {
        return '无'
      }
      return sortedKeys.value
        .map((v) => (v === 'Control' ? 'Ctrl' : v))
        .join(' + ')
    })

    watch(() => sortedKeys.value, () => {
      ctx.emit('input', sortedKeys.value)
    })

    watch(() => props.value, () => {
      if (!props.value) {
        return
      }
      if (props.value.every((v, i) => v === state.setKeys[i])) {
        return
      }
      state.setKeys = [...props.value]
    }, { immediate: true })

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
      inputString: inputDisplayString,
      handleKeyDown,
      handleKeyUp,
    }
  },
})
