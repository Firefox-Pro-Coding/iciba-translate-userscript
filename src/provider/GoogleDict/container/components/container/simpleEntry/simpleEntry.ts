import { defineComponent } from 'vue'

import phonetics from '../../common/phonetics/phonetics.vue'
import fragment from '../../common/fragment/fragment.vue'
import { Entry } from '~/provider/GoogleDict/types'

interface Props {
  entry: Entry
  isSubentry: boolean
}

export default defineComponent({
  name: 'GSimpleEntry',
  components: {
    phonetics,
    fragment,
  },
  props: {
    entry: {
      type: null,
      required: true,
    },
    isSubentry: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props: Props) => ({
    props,
  }),
})
