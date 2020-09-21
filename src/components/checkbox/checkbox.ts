import { defineComponent } from 'vue'

import mdi_baseline_check_box_24px from '~/assets/img/mdi/baseline-check_box-24px.svg'
import mdi_baseline_check_box_outline_blank_24px from '~/assets/img/mdi/baseline-check_box_outline_blank-24px.svg'

export default defineComponent({
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },

  setup: (props, ctx) => {
    const toggle = () => {
      ctx.emit('update:modelValue', !props.modelValue)
    }

    return {
      props,
      icon: {
        checked: mdi_baseline_check_box_24px,
        unchecked: mdi_baseline_check_box_outline_blank_24px,
      },
      toggle,
    }
  },
})
