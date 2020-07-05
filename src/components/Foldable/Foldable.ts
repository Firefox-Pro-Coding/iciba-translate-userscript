import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'GFoldable',
  props: {
    fold: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, ctx) => {
    const $refs: {
      wrapper: HTMLDivElement | undefined
    } = ctx.refs

    const state = reactive({
      foldTimeout: 0,
      duration: 300,
      height: props.fold ? '0' : 'auto',
    })

    const doFold = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }

      state.height = 'auto'

      if ($refs.wrapper) {
        state.height = `${$refs.wrapper.clientHeight}px`
      }

      state.foldTimeout = window.setTimeout(() => {
        state.height = '0'
      })
    }

    const doExpand = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }

      if ($refs.wrapper) {
        state.height = `${$refs.wrapper.clientHeight}px`
      }

      state.foldTimeout = window.setTimeout(() => {
        state.height = 'auto'
      }, state.duration)
    }

    watch(() => props.fold, () => {
      if (props.fold) {
        doFold()
      } else {
        doExpand()
      }
    })

    return {
      props,
      state,
    }
  },
})
