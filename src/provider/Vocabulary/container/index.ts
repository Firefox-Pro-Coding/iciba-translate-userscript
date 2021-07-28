import { defineComponent, computed } from 'vue'
import play from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import Scrollable from '~/components/Scrollable/Scrollable.vue'

import containerData from './data'
import { playAudio } from '../playAudio'

export default defineComponent({
  name: 'VocabularyContainer',
  components: {
    Scrollable,
  },
  setup: () => {
    const data = computed(() => containerData.data)

    const handlePlay = (key: string | null) => {
      if (!key) {
        return
      }

      playAudio(key)
    }

    return {
      icon: {
        play,
      },
      data,
      handlePlay,
    }
  },
})
