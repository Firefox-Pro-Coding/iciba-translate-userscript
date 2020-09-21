import { defineComponent, reactive, ref, watch } from 'vue'

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
  setup: (props) => {
    const refs = {
      root: ref<HTMLDivElement>(),
      wrapper: ref<HTMLDivElement>(),
    }

    const state = reactive({
      height: props.fold ? '0' : 'auto',
    })

    const doFold = () => {
      if (!refs.root.value || !refs.wrapper.value) {
        return
      }
      state.height = 'auto'
      refs.root.value.animate([
        { height: `${refs.wrapper.value.clientHeight}px` },
        { height: '0' },
      ], {
        duration: props.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })
      state.height = '0'
    }

    const doExpand = () => {
      if (!refs.root.value || !refs.wrapper.value) {
        return
      }
      state.height = 'auto'
      const full = refs.wrapper.value.clientHeight
      state.height = '0'
      refs.root.value.animate([
        { height: '0px' },
        { height: `${full}px` },
      ], {
        duration: props.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })

      state.height = 'auto'
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
      refs,
      state,
    }
  },
})
