import { defineComponent } from '@vue/composition-api'
import labels from '../labels/labels.vue'
import foldable from '../foldable/foldable.vue'
import { ExampleGroup } from '~/provider/GoogleDict/types'

interface Props {
  exampleGroups: Array<ExampleGroup>
}

export default defineComponent({
  name: 'GExampleGroups',
  components: {
    labels,
    foldable,
  },
  props: {
    exampleGroups: null,
  },
  setup: (props: Props) => ({
    props,
  }),
})
