import { createComponent } from '@vue/composition-api'
import googleDictBus from '~/provider/GoogleDict/bus'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

export default createComponent({
  name: 'GPhonetics',
  props: {
    phonetics: null,
  },
  setup: (props) => {
    const handlePlay = (url: string) => {
      googleDictBus.emit(googleDictBus.events.PLAY_AUDIO, url)
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
