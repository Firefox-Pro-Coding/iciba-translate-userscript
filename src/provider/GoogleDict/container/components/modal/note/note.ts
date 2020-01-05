import { createComponent } from '@vue/composition-api'
import labels from '../labels/labels.vue'

export default createComponent({
  name: 'GNote',
  components: {
    labels,
  },
  props: {
    note: null,
  },
  setup: (props) => ({
    props,
  }),
})
