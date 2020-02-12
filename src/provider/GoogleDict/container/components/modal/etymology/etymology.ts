import { createComponent } from '@vue/composition-api'
import fragment from '../../common/fragment/fragment.vue'
import imageLoader from '../imageLoader/imageLoader.vue'
import { Etymology } from '~/provider/GoogleDict/types'

interface Props {
  etymology: Etymology
}

export default createComponent({
  name: 'GEtymology',
  components: {
    fragment,
    imageLoader,
  },
  props: {
    etymology: null,
  },
  setup: (props: Props) => ({
    props,
  }),
})
