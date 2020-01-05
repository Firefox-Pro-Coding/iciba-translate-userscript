import { createComponent } from '@vue/composition-api'

import mdi_baseline_check_box_24px from '~/assets/img/mdi/baseline-check_box-24px.svg'
import mdi_baseline_check_box_outline_blank_24px from '~/assets/img/mdi/baseline-check_box_outline_blank-24px.svg'

export default createComponent({
  name: 'Checkbox',
  props: {
    value: {
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
      ctx.emit('input', !props.value)
    }

    return {
      icon: {
        checked: mdi_baseline_check_box_24px,
        unchecked: mdi_baseline_check_box_outline_blank_24px,
      },
      toggle,
    }
  },
})
