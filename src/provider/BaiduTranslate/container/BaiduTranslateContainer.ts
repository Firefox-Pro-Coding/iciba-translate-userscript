import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { BAIDU_LANGUAGES, BAIDU_LANGUAGE_MAP } from '~/constants/baiduLanguages'
import { PROVIDER } from '~/constants/constant'
import GlobalBus from '~/bus/bus'

import containerData from '../containerData'
import BaiduTranslateBus from '../bus'

@Component({
  name: 'BaiduTranslateContainer',
  components: {
    Scrollable,
  },
})
export default class BaiduTranslateContainer extends Vue {
  protected languages = Object.entries(BAIDU_LANGUAGE_MAP)
    .map(([id, name]) => ({ id: id as BAIDU_LANGUAGES, name }))
  protected icon = {
    play_speaker_filled_audio_tool_59284,
  }
  protected containerData = containerData
  protected selectLanguage = {
    visible: false,
    type: 'source' as 'source' | 'target',
  }

  protected getLanguage(language: BAIDU_LANGUAGES) {
    return BAIDU_LANGUAGE_MAP[language] || language
  }

  protected handleLanguageSelect(language: BAIDU_LANGUAGES | 'auto') {
    let sl
    let tl
    if (
      (this.selectLanguage.type === 'source' && language === containerData.targetLanguage)
      || (this.selectLanguage.type === 'target' && language === containerData.sourceLanguage)
    ) {
      sl = containerData.targetLanguage
      tl = containerData.sourceLanguage
    } else {
      sl = this.selectLanguage.type === 'source' ? language : containerData.sourceLanguage
      tl = this.selectLanguage.type === 'target' ? language : containerData.targetLanguage
    }

    GlobalBus.emit(GlobalBus.events.TRANSLATE, {
      uniqName: PROVIDER.BAIDU_TRANSLATE,
      word: containerData.inputText,
      sl,
      tl,
    })
    this.selectLanguage.visible = false
  }

  protected showLanguageSelect(type: 'source' | 'target') {
    this.selectLanguage.type = type
    this.selectLanguage.visible = true
  }

  protected handlePlay(type: 'source' | 'target') {
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
}
