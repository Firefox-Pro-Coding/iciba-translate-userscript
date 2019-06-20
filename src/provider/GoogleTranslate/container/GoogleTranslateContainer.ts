import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import GlobalBus from '~/bus/bus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { PROVIDER } from '~/constants/constant'

import { GOOGLE_LANGUAGE_MAP, GOOGLE_LANGUAGES } from '~/constants/googleLanguages'
import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

import containerData from '../containerData'
import GoogleTranslateBus from '../bus'

@Component({
  name: 'GoogleTranslateContainer',
  components: { Scrollable },
})
export default class GoogleTranslateContainer extends Vue {
  protected containerData = containerData
  protected languages = Object.entries(GOOGLE_LANGUAGE_MAP)
    .map(([id, name]) => ({ id: id as GOOGLE_LANGUAGES, name }))

  protected icon = {
    play_speaker_filled_audio_tool_59284,
  }

  protected selectLanguage = {
    visible: false,
    type: 'source' as 'source' | 'target',
  }

  protected getLanguage(language: GOOGLE_LANGUAGES) {
    return GOOGLE_LANGUAGE_MAP[language] || language
  }

  protected handleLanguageSelect(language: GOOGLE_LANGUAGES | 'auto') {
    GlobalBus.emit(GlobalBus.events.TRANSLATE, {
      uniqName: PROVIDER.GOOGLE_TRANSLATE,
      word: containerData.inputText,
      sl: this.selectLanguage.type === 'source' ? language : containerData.sourceLanguage,
      tl: this.selectLanguage.type === 'target' ? language : containerData.targetLanguage,
    })
    this.selectLanguage.visible = false
  }

  protected showLanguageSelect(type: 'source' | 'target') {
    this.selectLanguage.type = type
    this.selectLanguage.visible = true
  }

  protected handlePlay(type: 'source' | 'target') {
    GoogleTranslateBus.emit(
      GoogleTranslateBus.events.PLAY_AUDIO,
      type === 'source'
        ? {
          word: containerData.inputText,
          tl: containerData.detectedLanguage,
        }
        : {
          word: containerData.data.join(),
          tl: containerData.targetLanguage,
        },
    )
  }
}
