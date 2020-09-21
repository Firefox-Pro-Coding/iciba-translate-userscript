import { defineComponent } from 'vue'

import labelSet from '../labelSet/labelSet.vue'
import labels from '../labels/labels.vue'
import phonetics from '../../common/phonetics/phonetics.vue'
import etymology from '../etymology/etymology.vue'
import note from '../note/note.vue'
import senseItem from '../senseItem/senseItem.vue'
import morphUnit from '../morphUnit/morphUnit.vue'
import { Entry, SubEntry } from '~/provider/GoogleDict/types'

interface PropsEntry {
  entry: Entry & SubEntry
  isSubentry?: false
}

interface PropsSubEntry {
  entry: SubEntry
  isSubentry: true
}

type Props = PropsEntry | PropsSubEntry

export default defineComponent({
  name: 'GEntry',
  components: {
    labels,
    labelSet,
    phonetics,
    etymology,
    note,
    senseItem,
    morphUnit,
  },
  props: {
    entry: {
      type: null,
      required: true,
    },
    isSubentry: {
      type: Boolean,
      required: true,
    },
  },
  setup: (props: Props) => ({
    e: props.entry,
    isSub: !!props.isSubentry,
  }),
})
