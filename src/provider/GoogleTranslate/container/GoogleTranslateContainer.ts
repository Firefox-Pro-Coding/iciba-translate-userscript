import { computed, defineComponent, reactive } from 'vue'
import { bus, EVENTS } from '~/service/globalBus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { PROVIDER } from '~/constants'

import { audioBus, AEVENTS } from '~/service/audioBus'
import { GOOGLE_LANGUAGE_MAP, GOOGLE_LANGUAGES } from '~/constants/googleLanguages'
import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

import containerData from '../containerData'

const languages = Object.entries(GOOGLE_LANGUAGE_MAP)
  .map(([id, name]) => ({ id: id as GOOGLE_LANGUAGES, name }))

const icon = {
  play_speaker_filled_audio_tool_59284,
}

export default defineComponent({
  name: 'GoogleTranslateContainer',
  components: { Scrollable },
  setup: () => {
    const state = reactive({
      visible: false,
      type: 'source' as 'source' | 'target',
    })

    const getLanguage = (language: string) => GOOGLE_LANGUAGE_MAP[language as GOOGLE_LANGUAGES] || language

    const handleLanguageSelect = (language: GOOGLE_LANGUAGES | 'auto') => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word: containerData.inputText,
        param: {
          provider: PROVIDER.GOOGLE_TRANSLATE,
          param: {
            sl: state.type === 'source' ? language : containerData.data!.sourceLanguage,
            tl: state.type === 'target' ? language : containerData.data!.targetLanguage,
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
        id: PROVIDER.GOOGLE_TRANSLATE,
        params: type === 'source'
          ? {
            word: containerData.inputText,
            tl: containerData.data!.detectedLanguage,
          }
          : {
            word: containerData.data!.translate,
            tl: containerData.data!.targetLanguage,
          },
      })
    }

    return {
      state,
      data: computed(() => containerData.data!),
      languages,
      icon,

      getLanguage,
      handleLanguageSelect,
      showLanguageSelect,
      handlePlay,
    }
  },
})
