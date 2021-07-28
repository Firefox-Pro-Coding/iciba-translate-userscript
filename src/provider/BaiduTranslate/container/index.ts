import { defineComponent, reactive } from 'vue'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { BAIDU_LANGUAGES, BAIDU_LANGUAGE_MAP } from '~/provider/BaiduTranslate/baiduLanguages'
import { bus, EVENTS } from '~/service/globalBus'

import containerData from './data'
import { playAudio } from '../playAudio'
import { BaiduTranslateProvider } from '..'

const languages = Object.entries(BAIDU_LANGUAGE_MAP)
  .map(([id, name]) => ({ id: id as BAIDU_LANGUAGES, name }))

const icon = {
  play_speaker_filled_audio_tool_59284,
}

export default defineComponent({
  name: 'BaiduTranslateContainer',
  components: {
    Scrollable,
  },
  setup: () => {
    const state = reactive({
      visible: false,
      type: 'source' as 'source' | 'target',
    })

    const getLanguage = (language: BAIDU_LANGUAGES) => BAIDU_LANGUAGE_MAP[language] || language

    const handleLanguageSelect = (language: BAIDU_LANGUAGES | 'auto') => {
      let sl = state.type === 'source' ? language : containerData.sourceLanguage
      let tl = state.type === 'target' ? language : containerData.targetLanguage

      if (
        (state.type === 'source' && language === containerData.targetLanguage)
        || (state.type === 'target' && language === containerData.sourceLanguage)
      ) {
        sl = containerData.targetLanguage
        tl = containerData.sourceLanguage
      }

      bus.emit({
        type: EVENTS.TRANSLATE,
        word: containerData.inputText,
        param: {
          provider: BaiduTranslateProvider.id,
          param: {
            sl,
            tl,
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
        : containerData.data.join()
      const tl = type === 'source'
        ? containerData.sourceLanguage
        : containerData.targetLanguage
      playAudio(word, tl)
    }

    return {
      state,
      languages,
      icon,
      containerData,

      getLanguage,
      handleLanguageSelect,
      showLanguageSelect,
      handlePlay,
    }
  },
})
