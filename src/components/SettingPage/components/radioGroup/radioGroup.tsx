import { createComponent } from '@vue/composition-api'

export default createComponent({
  model: {},
  props: {
    value: null,
  },
  setup: (props, setupContext) => {
    const handleRadioClick = (value: unknown) => {
      setupContext.emit('input', value)
    }
    return () => (
      <div class='radio-group flex-co align-start'>
        {setupContext.slots.default().map((v) => {
          if (v.componentOptions && v.componentOptions.propsData) {
            const childProps = v.componentOptions.propsData as any
            childProps.checked = childProps.value === props.value
            childProps.updateValue = handleRadioClick
          }
          return v
        })}
      </div>
    )
  },
})
