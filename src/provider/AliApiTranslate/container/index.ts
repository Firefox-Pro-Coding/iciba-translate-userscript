import { defineComponent, reactive } from 'vue'

import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { ALI_API_LANGUAGE_MAP, ALI_API_LANGUAGES } from '~/provider/AliApiTranslate/aliApiLanguages'
import { bus, EVENTS } from '~/service/globalBus'

import containerData from './data'
import { AliApiTranslateProvider } from '..'

const languages = Object.entries(ALI_API_LANGUAGE_MAP)
  .map(([id, name]) => ({ id: id as ALI_API_LANGUAGES, name }))

export default defineComponent({
  name: 'AliApiTranslateContainer',
  components: {
    Scrollable,
  },
  setup: () => {
    const state = reactive({
      visible: false,
      type: 'source' as 'source' | 'target',
    })

    const getLanguage = (language: ALI_API_LANGUAGES) => ALI_API_LANGUAGE_MAP[language] || language

    const handleLanguageSelect = (language: ALI_API_LANGUAGES | 'autp') => {
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
          provider: AliApiTranslateProvider.id,
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

    return {
      state,
      languages,
      containerData,

      getLanguage,
      handleLanguageSelect,
      showLanguageSelect,
    }
  },
})
