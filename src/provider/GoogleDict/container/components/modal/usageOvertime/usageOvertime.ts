import { defineComponent } from 'vue'
import { UsageOverTimeImage } from '~/provider/GoogleDict/types'
import imageLoader from '../imageLoader/imageLoader.vue'

interface Props {
  image: UsageOverTimeImage
}

export default defineComponent({
  name: 'GUsageOvertime',
  components: {
    imageLoader,
  },
  props: {
    image: {
      type: null,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  setup: (props: Props) => ({
    m: props.image,
  }),
})
