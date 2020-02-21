import { defineComponent } from '@vue/composition-api'
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
    image: null,
    term: {
      type: String,
      required: true,
    },
  },
  setup: (props: Props) => ({
    m: props.image,
  }),
})
