import { defineComponent } from '@vue/composition-api'
import { MorphUnit } from '~/provider/GoogleDict/types'

interface Props {
  morphUnits: Array<MorphUnit>
}

export default defineComponent({
  name: 'GMorphUnits',
  props: {
    morphUnits: null,
  },
  setup: (props: Props) => ({
    props,
  }),
})
