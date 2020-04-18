import { defineComponent, computed } from '@vue/composition-api'
import Foldable from '~/components/Foldable/Foldable.vue'
import labelSet from '../labelSet/labelSet.vue'
import labels from '../labels/labels.vue'
import thesaurus from '../thesaurus/thesaurus.vue'
import fragment from '../../common/fragment/fragment.vue'
import etymology from '../etymology/etymology.vue'
import exampleGroups from '../exampleGroups/exampleGroups.vue'

import { store } from '~/service/store'
import { Sense, ExampleGroup, ThesaurusEntry } from '~/provider/GoogleDict/types'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'

interface Props {
  sense: Sense
  index: number
}

export default defineComponent({
  name: 'GSenseItem',
  components: {
    labels,
    labelSet,
    thesaurus,
    fragment,
    etymology,
    exampleGroups,
    Foldable,
  },
  props: {
    sense: {
      type: null,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup: (props: Props) => {
    const conbineExamples = (
      eg: Array<ExampleGroup> | undefined,
      th: Array<ThesaurusEntry> | undefined,
    ): Array<ExampleGroup> => [
      ...eg ?? [],
      ...(th ?? []).filter((v) => v.examples).map((v) => ({
        examples: v.examples as Array<string>,
      })),
    ]

    const subSenseFolded = computed(() => store.config[PROVIDER.GOOGLE_DICT].foldStatus >= GOOGLE_DICT_FOLD_STATUS.FOLD_SUBSENSE)

    return {
      s: props.sense,
      conbineExamples,
      subSenseFolded,
      store,
    }
  },
})
