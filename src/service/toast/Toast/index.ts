import { defineComponent, reactive, onMounted } from 'vue'

export const Toast = defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    destroy: {
      type: Function,
      required: true,
    },
  },
  setup: (props) => {
    const state = reactive({
      visible: false,
    })

    onMounted(() => {
      state.visible = true
      setTimeout(() => {
        state.visible = false
        setTimeout(() => {
          (props.destroy as () => unknown)()
        }, 3000)
      }, props.timeout)
    })

    return {
      state,
      props,
    }
  },
})

export default Toast

export type ToastComponent = typeof Toast
