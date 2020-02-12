import { createComponent } from '@vue/composition-api'

import phonetics from '../../common/phonetics/phonetics.vue'
import fragment from '../../common/fragment/fragment.vue'
import { Entry } from '~/provider/GoogleDict/types'

interface Props {
  entry: Entry
  isSubentry: boolean
}

export default createComponent({
  name: 'GSimpleEntry',
  components: {
    phonetics,
    fragment,
  },
  props: {
    entry: null,
    isSubentry: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props: Props) => ({
    props,
  }),
})
