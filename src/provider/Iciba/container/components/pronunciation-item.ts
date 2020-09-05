import { defineComponent } from '@vue/composition-api'

import Scrollable from '~/components/Scrollable/Scrollable.vue'
import play from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

export default defineComponent({
  name: 'IcibaPronunciation',
  props: {
    ipa: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },
  components: {
    Scrollable,
  },
  setup: (props, ctx) => {
    const handlePlay = () => {
      ctx.emit('play')
    }

    return {
      props,
      handlePlay,
      icon: {
        play,
      },
    }
  },
})
