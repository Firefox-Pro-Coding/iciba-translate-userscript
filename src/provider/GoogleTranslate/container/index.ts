import { computed, defineComponent, reactive } from 'vue'
import { bus, EVENTS } from '~/service/globalBus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'

import { GOOGLE_LANGUAGE_MAP, GOOGLE_LANGUAGES } from '~/provider/GoogleTranslate/googleLanguages'
import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

import containerData from './data'
import { playAudio } from '../playAudio'
import { GoogleTranslateProvider } from '..'

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
          provider: GoogleTranslateProvider.id,
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
      const word = type === 'source'
        ? containerData.inputText
        : containerData.data!.translate.map((v) => v.text).join('')

      const tl = type === 'source'
        ? containerData.data!.detectedLanguage
        : containerData.data!.targetLanguage

      playAudio(word, tl)
    }

    return {
      state,
      data: computed(() => containerData.data!),
      translateText: computed(() => containerData.data?.translate.map((v) => v.text).join('').split('\n') ?? []),
      languages,
      icon,

      getLanguage,
      handleLanguageSelect,
      showLanguageSelect,
      handlePlay,
    }
  },
})
