import { computed, ComputedRef, defineComponent, inject } from 'vue'

import mdi_baseline_radio_button_checked_24px from '~/assets/img/mdi/baseline-radio_button_checked-24px.svg'
import mdi_baseline_radio_button_unchecked_24px from '~/assets/img/mdi/baseline-radio_button_unchecked-24px.svg'

const icon = {
  checked: mdi_baseline_radio_button_checked_24px,
  unchecked: mdi_baseline_radio_button_unchecked_24px,
}

export interface RadioProps {
  modelValue: boolean
  label: string
  checked: boolean
  updateValue: (p: boolean) => unknown
}

export default defineComponent({
  props: {
    modelValue: {
      type: null,
    },
    value: {
      type: null,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup: (props, ctx) => {
    const handleRadioClick: ((p: any) => unknown) | undefined = inject('radio-group-handle-radio-click')
    const currentValue = inject('radio-group-value', props.modelValue) as ComputedRef<unknown>

    const handleClick = () => {
      ctx.emit('update:modelValue', props.value)
      if (handleRadioClick) {
        handleRadioClick(props.value)
      }
    }

    const checked = computed(() => {
      if (currentValue) {
        return currentValue.value === props.value
      }
      return props.value === props.modelValue
    })

    return {
      handleClick,
      icon,
      props,
      checked,
    }
  },
})
