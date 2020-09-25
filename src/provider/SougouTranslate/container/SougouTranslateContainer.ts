import { defineComponent } from 'vue'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import { SOUGOU_LANGUAGE_MAP, SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'
import { PROVIDER } from '~/constants'
import { bus, EVENTS } from '~/service/globalBus'
import { audioBus, AEVENTS } from '~/service/audioBus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'

import containerData from '../containerData'

const languages = Object.entries(SOUGOU_LANGUAGE_MAP)
  .map(([id, name]) => ({ id: id as SOUGOU_LANGUAGES, name }))

const icon = {
  play_speaker_filled_audio_tool_59284,
}

export default defineComponent({
  name: 'SougouTranslateContainer',
  components: {
    Scrollable,
  },
  setup: () => {
    const state = {
      visible: false,
      type: 'source' as 'source' | 'target',
    }

    const getLanguage = (language: SOUGOU_LANGUAGES) => SOUGOU_LANGUAGE_MAP[language] || language

    const handleLanguageSelect = (language: SOUGOU_LANGUAGES | 'auto') => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word: containerData.inputText,
        param: {
          provider: PROVIDER.GOOGLE_TRANSLATE,
          param: {
            sl: state.type === 'source' ? language : containerData.sourceLanguage,
            tl: state.type === 'target' ? language : containerData.targetLanguage,
          },
        },
      })
      state.visible = false
    }

    const showLanguageSelect = (type: 'source' | 'target') => {
      state.type = type
      state.visible = true
    }

    const handlePlay = (type: 'source' | 'target') => {
      audioBus.emit({
        type: AEVENTS.PLAY_AUDIO,
        id: PROVIDER.SOUGOU_TRANSLATE,
        params: type === 'source'
          ? {
            word: containerData.inputText,
            tl: containerData.detectedLanguage,
          }
          : {
            word: containerData.data.join(),
            tl: containerData.targetLanguage,
          },
      })
    }

    return {
      state,
      data: containerData,

      languages,
      icon,

      getLanguage,
      handleLanguageSelect,
      showLanguageSelect,
      handlePlay,
    }
  },
})
