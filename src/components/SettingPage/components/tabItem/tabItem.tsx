import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    index: Number,
    current: Number,
  },
  setup: (props, ctx) => () => {
    const VNodes = ctx.slots.default()
    return (
      <div>
        {VNodes.map((v) => {
          if (v.componentOptions?.propsData) {
            const pd: any = v.componentOptions.propsData
            pd.active = props.index === props.current
          }
          return v
        })}
      </div>
    )
  },
})
