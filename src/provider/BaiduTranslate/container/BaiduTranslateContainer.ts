import { createComponent, reactive } from '@vue/composition-api'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { BAIDU_LANGUAGES, BAIDU_LANGUAGE_MAP } from '~/constants/baiduLanguages'
import { PROVIDER } from '~/constants/constant'
import { bus, EVENTS } from '~/service/globalBus'

import containerData from '../containerData'
import BaiduTranslateBus from '../bus'

const languages = Object.entries(BAIDU_LANGUAGE_MAP)
  .map(([id, name]) => ({ id: id as BAIDU_LANGUAGES, name }))

const icon = {
  play_speaker_filled_audio_tool_59284,
}

export default createComponent({
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
          provider: PROVIDER.BAIDU_TRANSLATE,
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
      BaiduTranslateBus.emit(
        BaiduTranslateBus.events.PLAY_AUDIO,
        type === 'source'
          ? {
            word: containerData.inputText,
            tl: containerData.sourceLanguage,
          }
          : {
            word: containerData.data.join(),
            tl: containerData.targetLanguage,
          },
      )
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
