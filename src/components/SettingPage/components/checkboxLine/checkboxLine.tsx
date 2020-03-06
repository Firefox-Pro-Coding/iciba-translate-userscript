import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'CheckboxLine',
  props: {
    value: Boolean,
    text: String,
    label: String,
  },

  setup: (props, ctx) => {
    const handleInput = (v: boolean) => ctx.emit('input', v)

    return () => (
      <div class="mt-4">
        <i-checkbox
          value={props.value}
          onInput={handleInput}
          label={props.label ?? ''}
        />
        <p class="text-14 text-grey-500 mt-1 mb-0">
          {ctx.slots.default && ctx.slots.default()}
          {!ctx.slots.default && (props.text || '')}
        </p>
      </div>
    )
  },
})
