import { defineComponent } from 'vue'
import { MorphUnit } from '~/provider/GoogleDict/types'

interface Props {
  morphUnits: Array<MorphUnit>
}

export default defineComponent({
  name: 'GMorphUnits',
  props: {
    morphUnits: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => ({
    props,
  }),
})
