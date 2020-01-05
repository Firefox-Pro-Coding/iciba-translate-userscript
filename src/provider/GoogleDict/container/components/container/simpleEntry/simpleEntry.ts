import { createComponent } from '@vue/composition-api'

import phonetics from '../../common/phonetics/phonetics.vue'
import fragment from '../../common/fragment/fragment.vue'


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
  setup: (props) => ({
    props,
  }),
})
