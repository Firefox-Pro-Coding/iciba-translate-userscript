import { createComponent, reactive, watch, onMounted } from '@vue/composition-api'

export default createComponent({
  name: 'GFoldable',
  props: {
    fold: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, ctx) => {
    const $refs: {
      wrapper: HTMLDivElement
    } = ctx.refs

    const state = reactive({
      foldTimeout: 0,
      duration: 300,
      foldableStyle: { height: 'auto' },
    })

    const doFold = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }
      if ($refs.wrapper) {
        state.foldableStyle = {
          height: `${$refs.wrapper.clientHeight}px`,
        }
      }
      state.foldTimeout = window.setTimeout(() => {
        state.foldableStyle = { height: '0' }
      })
    }

    const doExpand = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }
      if ($refs.wrapper) {
        state.foldableStyle = {
          height: `${$refs.wrapper.clientHeight}px`,
        }
      }
      state.foldTimeout = window.setTimeout(() => {
        state.foldableStyle = { height: 'auto' }
      }, state.duration)
    }

    watch(() => props.fold, () => {
      if (props.fold) {
        doFold()
      } else {
        doExpand()
      }
    })

    onMounted(() => {
      if (props.fold) {
        state.foldableStyle = { height: '0' }
      } else {
        state.foldableStyle = { height: 'auto' }
      }
    })

    return {
      props,
      state,
    }
  },
})
