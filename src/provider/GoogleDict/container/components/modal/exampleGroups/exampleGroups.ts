import { createComponent } from '@vue/composition-api'
import labels from '../labels/labels.vue'
import foldable from '../foldable/foldable.vue'

export default createComponent({
  name: 'GExampleGroups',
  components: {
    labels,
    foldable,
  },
  props: {
    exampleGroups: null,
  },
  setup: (props) => ({
    props,
  }),
})
