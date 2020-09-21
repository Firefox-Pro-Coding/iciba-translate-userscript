import { defineComponent } from 'vue'
import labels from '../labels/labels.vue'
import { Note } from '~/provider/GoogleDict/types'

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
