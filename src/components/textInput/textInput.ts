import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
      default: 'text',
    },
    placeholder: String,
  },
  setup: (props, ctx) => {
    const handleInput = (e: InputEvent) => {
      e.stopPropagation()
      const target = e.target as HTMLInputElement
      ctx.emit('update:modelValue', target.value)
    }

    return {
      props,

      handleInput,
    }
  },
})
