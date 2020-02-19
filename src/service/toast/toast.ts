import { defineComponent, reactive, onMounted } from '@vue/composition-api'

export default defineComponent({
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
          props.destroy()
        }, 3000)
      }, props.timeout)
    })

    return {
      state,
      props,
    }
  },
})
