import { defineComponent } from '@vue/composition-api'
import Foldable from '~/components/Foldable/Foldable.vue'
import labels from '../labels/labels.vue'
import { ExampleGroup } from '~/provider/GoogleDict/types'

interface Props {
  exampleGroups: Array<ExampleGroup>
}

export default defineComponent({
  name: 'GExampleGroups',
  components: {
    labels,
    Foldable,
  },
  props: {
    exampleGroups: null,
  },
  setup: (props: Props) => ({
    props,
  }),
})
