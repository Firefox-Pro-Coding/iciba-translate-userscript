import { defineComponent, computed } from '@vue/composition-api'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import containerData from '../containerData'
import play from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import { audioCacheService } from '~/service/audioCache'
import { got } from '~/util/gmapi'

export default defineComponent({
  name: 'VocabularyContainer',
  components: {
    Scrollable,
  },
  setup: () => {
    const data = computed(() => containerData.data)

    const handlePlay = async (key: string): Promise<void> => {
      if (!key) {
        return
      }
      const url = `https://audio.vocab.com/1.0/us/${key}.mp3`
      const volume = 0.65

      if (audioCacheService.play(url, volume)) {
        return
      }

      const response = await got<ArrayBuffer>({
        method: 'GET',
        headers: {
          'Referer': 'https://www.vocabulary.com',
        },
        responseType: 'arraybuffer',
        url,
        timeout: 5000,
      })
      audioCacheService.play(url, response.response, volume)
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
