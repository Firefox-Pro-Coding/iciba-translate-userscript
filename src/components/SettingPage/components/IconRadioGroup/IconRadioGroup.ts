import { createComponent } from '@vue/composition-api'
import checked_291201 from '~/assets/img/checked_291201.svg'

interface Props {
  value: string
  icons: Array<{ icon: string, key: string }>
}

export default createComponent({
  model: {},
  props: {
    value: {
      type: String,
      required: true,
    },
    icons: {
      type: Array,
      required: true,
    },
  },
  setup: (props: Props, context) => {
    const handleSelect = (key: string) => {
      context.emit('input', key)
    }
    return {
      props,
      handleSelect,
      checkedIconSvg: checked_291201,
    }
  },
})
