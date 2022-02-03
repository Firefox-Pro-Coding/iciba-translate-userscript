import { defineComponent } from 'vue'
import { Note } from '~/provider/GoogleDict/types'
import labels from '../labels/labels.vue'

interface Props {
  note: Note
}

export default defineComponent({
  name: 'GNote',
  components: {
    labels,
  },
  props: {
    note: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => ({
    props,
  }),
})
