import { defineComponent } from 'vue'
import checked_291201 from '~/assets/img/checked_291201.svg'

interface Props {
  modelValue: string
  icons: Array<{ icon: string, key: string }>
}

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    icons: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props, context) => {
    const handleSelect = (key: string) => {
      context.emit('update:modelValue', key)
    }
    return {
      props,
      handleSelect,
      checkedIconSvg: checked_291201,
    }
  },
})
