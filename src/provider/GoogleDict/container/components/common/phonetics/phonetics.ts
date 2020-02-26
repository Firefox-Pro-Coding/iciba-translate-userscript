import { defineComponent } from '@vue/composition-api'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import { audioBus, AEVENTS } from '~/service/audioBus'
import { PROVIDER } from '~/constants/constant'

export default defineComponent({
  name: 'GPhonetics',
  props: {
    phonetics: null,
  },
  setup: (props) => {
    const handlePlay = (url: string) => {
      audioBus.emit({
        type: AEVENTS.PLAY_AUDIO,
        id: PROVIDER.GOOGLE_DICT,
        params: {
          url,
        },
      })
    }
    return {
      icon: {
        play_speaker_filled_audio_tool_59284,
      },
      props,
      handlePlay,
    }
  },
})
