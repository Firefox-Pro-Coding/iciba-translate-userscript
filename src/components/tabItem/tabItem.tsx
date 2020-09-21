import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    index: Number,
    current: Number,
  },
  setup: (props, ctx) => () => {
    const VNodes = ctx.slots.default?.() ?? []
    return (
      <div>
        {VNodes.map((v) => {
          if (v.props) {
            const pd: any = v.props
            pd.active = props.index === props.current
          }
          return v
        })}
      </div>
    )
  },
})
