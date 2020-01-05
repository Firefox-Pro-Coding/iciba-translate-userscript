
import { createComponent, computed } from '@vue/composition-api'
import labels from '../labels/labels.vue'

export default createComponent({
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
  setup: (props) => {
    const isValid = computed(() => {
      const l = props.labelSet
      return l && Object.keys(l).some((k) => l[k].length)
    })
    return {
      props,
      isValid,
    }
  },
})
