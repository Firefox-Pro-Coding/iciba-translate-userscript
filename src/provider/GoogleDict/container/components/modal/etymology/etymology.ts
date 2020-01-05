import { createComponent } from '@vue/composition-api'
import fragment from '../../common/fragment/fragment.vue'
import imageLoader from '../imageLoader/imageLoader.vue'


export default createComponent({
  name: 'GEtymology',
  components: {
    fragment,
    imageLoader,
  },
  props: {
    etymology: null,
  },
  setup: (props) => ({
    props,
  }),
})
