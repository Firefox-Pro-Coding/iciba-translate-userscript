import { createComponent } from '@vue/composition-api'

import labelSet from '../labelSet/labelSet.vue'
import labels from '../labels/labels.vue'
import phonetics from '../../common/phonetics/phonetics.vue'
import etymology from '../etymology/etymology.vue'
import note from '../note/note.vue'
import senseItem from '../senseItem/senseItem.vue'
import morphUnit from '../morphUnit/morphUnit.vue'

export default createComponent({
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
    entry: null,
    isSubentry: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props) => ({
    e: props.entry,
    isSub: props.isSubentry,
  }),
})
