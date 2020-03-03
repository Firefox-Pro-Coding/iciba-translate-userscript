import { defineComponent, computed } from '@vue/composition-api'
import labels from '../labels/labels.vue'
import { LabelSet } from '~/provider/GoogleDict/types'

interface Props {
  labelSet: LabelSet
  size: string
  color: string
}

export default defineComponent({
  name: 'GLabelSet',
  components: {
    labels,
  },
  props: {
    labelSet: null,
    size: {
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup: (props: Props) => {
    const isValid = computed(() => {
      const l = props.labelSet
      if (!l) {
        return false
      }
      const values = Object.values(l)
      return values.length && values.some((arr) => arr?.length)
    })
    return {
      props,
      isValid,
    }
  },
})
