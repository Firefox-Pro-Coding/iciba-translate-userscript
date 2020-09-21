import { computed, defineComponent, provide } from 'vue'

export default defineComponent({
  props: {
    modelValue: null,
  },
  setup: (props, ctx) => {
    const handleRadioClick = (value: unknown) => {
      ctx.emit('update:modelValue', value)
    }

    provide('radio-group-handle-radio-click', handleRadioClick)
    provide('radio-group-value', computed(() => props.modelValue as unknown))

    return () => (
      <div class='radio-group flex-col items-start'>
        {ctx.slots.default?.()}
      </div>
    )
  },
})
