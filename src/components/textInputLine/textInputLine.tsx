import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextInputLine',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    label: {
      type: String,
      default: '',
    },
  },

  setup: (props, ctx) => {
    const handleInput = (v: boolean) => {
      ctx.emit('update:modelValue', v)
    }

    return () => (
      <div class={'flex mt-4'}>
        <label class='label text-grey-700 py-5px pr-10px my-2px'>
          {props.label ?? ''}
        </label>
        <i-text-input
          inputType={props.inputType}
          placeholder={props.placeholder}
          modelValue={props.modelValue}
          {...{
            'onUpdate:modelValue': handleInput,
          }}
        />
      </div>
    )
  },
})
