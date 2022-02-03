import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxLine',
  props: {
    modelValue: Boolean,
    text: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    nomt: Boolean,
  },

  setup: (props, ctx) => {
    const handleInput = (v: boolean) => {
      ctx.emit('update:modelValue', v)
    }

    return () => (
      <div class={[!props.nomt && 'mt-6']}>
        <i-checkbox
          label={props.label ?? ''}
          modelValue={props.modelValue}
          {...{
            'onUpdate:modelValue': handleInput,
          }}
        />
        <p class="text-14 text-grey-400 mt-1 mb-0">
          {ctx.slots.default?.()}
          {!ctx.slots.default && (props.text || '')}
        </p>
      </div>
    )
  },
})
