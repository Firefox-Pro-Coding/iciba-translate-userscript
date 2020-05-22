import { defineComponent, reactive, watch, onMounted } from '@vue/composition-api'

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
      foldableStyle: {
        height: 'auto',
        overflow: 'visible',
      },
    })

    const doFold = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }

      state.foldableStyle.overflow = 'hidden'
      if ($refs.wrapper) {
        state.foldableStyle.height = `${$refs.wrapper.clientHeight}px`
      }
      state.foldTimeout = window.setTimeout(() => {
        state.foldableStyle.height = '0'
      })
    }

    const doExpand = () => {
      if (state.foldTimeout) {
        window.clearTimeout(state.foldTimeout)
      }

      if ($refs.wrapper) {
        state.foldableStyle.height = `${$refs.wrapper.clientHeight}px`
      }
      state.foldTimeout = window.setTimeout(() => {
        state.foldableStyle = {
          height: 'auto',
          overflow: 'visible',
        }
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
        state.foldableStyle = {
          height: '0',
          overflow: 'hidden',
        }
      } else {
        state.foldableStyle = {
          height: 'auto',
          overflow: 'visible',
        }
      }
    })

    return {
      props,
      state,
    }
  },
})
