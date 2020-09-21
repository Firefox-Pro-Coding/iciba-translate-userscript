import { defineComponent } from 'vue'
import fragment from '../../common/fragment/fragment.vue'
import imageLoader from '../imageLoader/imageLoader.vue'
import { Etymology } from '~/provider/GoogleDict/types'

interface Props {
  etymology: Etymology
}

export default defineComponent({
  name: 'GEtymology',
  components: {
    fragment,
    imageLoader,
  },
  props: {
    etymology: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => ({
    props,
  }),
})
