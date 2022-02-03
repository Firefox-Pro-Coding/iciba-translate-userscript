import { defineComponent, computed } from 'vue'
import Foldable from '~/components/Foldable/Foldable.vue'
import { ExampleGroup } from '~/provider/GoogleDict/types'
import { store } from '~/provider/GoogleDict/store'
import { GOOGLE_DICT_FOLD_STATUS } from '~/provider/GoogleDict/constant'
import labels from '../labels/labels.vue'

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
    exampleGroups: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => {
    const folded = computed(() => store.data.foldStatus >= GOOGLE_DICT_FOLD_STATUS.FOLD_EXAMPLES)
    return {
      props,
      folded,
    }
  },
})
