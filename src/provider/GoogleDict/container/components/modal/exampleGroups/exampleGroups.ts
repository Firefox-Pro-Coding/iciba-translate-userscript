import { defineComponent, computed } from 'vue'
import Foldable from '~/components/Foldable/Foldable.vue'
import { ExampleGroup } from '~/provider/GoogleDict/types'
import { store } from '~/service/store'
import { GOOGLE_DICT_FOLD_STATUS, PROVIDER } from '~/constants'
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
    const folded = computed(() => store.config[PROVIDER.GOOGLE_DICT].foldStatus >= GOOGLE_DICT_FOLD_STATUS.FOLD_EXAMPLES)
    return {
      props,
      folded,
    }
  },
})
