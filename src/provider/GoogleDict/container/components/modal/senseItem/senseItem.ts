import { defineComponent } from '@vue/composition-api'

import labelSet from '../labelSet/labelSet.vue'
import labels from '../labels/labels.vue'
import thesaurus from '../thesaurus/thesaurus.vue'
import fragment from '../../common/fragment/fragment.vue'
import etymology from '../etymology/etymology.vue'
import exampleGroups from '../exampleGroups/exampleGroups.vue'
import foldable from '../foldable/foldable.vue'

import { store } from '~/service/store'
import { Sense } from '~/provider/GoogleDict/types'

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
    foldable,
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
  setup: (props: Props) => ({
    s: props.sense,
    store,
  }),
})
