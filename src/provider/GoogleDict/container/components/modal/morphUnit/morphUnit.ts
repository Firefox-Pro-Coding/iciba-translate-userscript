import { createComponent } from '@vue/composition-api'
import { MorphUnit } from '~/provider/GoogleDict/types'

interface Props {
  morphUnits: Array<MorphUnit>
}

export default createComponent({
  name: 'GMorphUnits',
  props: {
    morphUnits: null,
  },
  setup: (props: Props) => ({
    props,
  }),
})
