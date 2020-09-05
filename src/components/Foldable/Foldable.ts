import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'GFoldable',
  props: {
    fold: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
  },
  setup: (props, ctx) => {
    const $refs: {
      root: HTMLDivElement | undefined
      wrapper: HTMLDivElement | undefined
    } = ctx.refs

    const state = reactive({
      folding: false,
      height: props.fold ? '0' : 'auto',
    })

    const doFold = () => {
      if (state.folding || !$refs.root || !$refs.wrapper) {
        return
      }
      state.folding = true
      state.height = 'auto'
      $refs.root.animate([
        { height: `${$refs.wrapper.clientHeight}px` },
        { height: '0' },
      ], {
        duration: props.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })
      state.height = '0'
      window.setTimeout(() => {
        state.folding = false
      }, props.duration)
    }

    const doExpand = () => {
      if (state.folding || !$refs.root || !$refs.wrapper) {
        return
      }
      state.folding = true
      state.height = 'auto'
      const full = $refs.wrapper.clientHeight
      state.height = '0'
      $refs.root.animate([
        { height: '0px' },
        { height: `${full}px` },
      ], {
        duration: props.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })

      state.height = 'auto'

      window.setTimeout(() => {
        state.folding = false
      }, props.duration)
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
