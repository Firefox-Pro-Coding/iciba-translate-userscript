import { defineComponent } from 'vue'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import { playAudio } from '../../../../playAudio'

export default defineComponent({
  name: 'GPhonetics',
  props: {
    phonetics: {
      type: null,
      required: true,
    },
  },
  setup: (props) => {
    const handlePlay = (url: string) => {
      playAudio(url)
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
