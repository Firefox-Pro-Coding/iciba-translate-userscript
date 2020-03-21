import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  model: {},
  props: {
    value: null,
  },
  setup: (props, setupContext) => {
    const handleRadioClick = (value: unknown) => {
      setupContext.emit('input', value)
    }
    return () => (
      <div class='radio-group flex-col items-start'>
        {setupContext.slots.default().map((v) => {
          if (v.componentOptions && v.componentOptions.propsData) {
            v.componentOptions.listeners = v.componentOptions.listeners ?? {}
            const listeners = v.componentOptions.listeners as any
            listeners.update_value = handleRadioClick
            const childProps = v.componentOptions.propsData as any
            childProps.checked = childProps.value === props.value
          }
          return v
        })}
      </div>
    )
  },
})
