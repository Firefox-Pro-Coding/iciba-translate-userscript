import { defineComponent, computed } from 'vue'

import Scrollable from '~/components/Scrollable/Scrollable.vue'
import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'
import { bus, EVENTS } from '~/service/globalBus'

import { playAudio } from '../playAudio'
import type {
  BaseInfo,
  BaseInfoNormal,
  BaseInfoTranslate,
  ChineseCi,
  SymbolCN,
  SymbolEN,
  BaseInfoSuggestion,
} from '../types'
import { containerData } from './data'
import IcibaPronunciation from './components/pronunciation-item.vue'
import { IcibaProvider } from '..'

const isBaseInfoBaseInfoNormal = (p: BaseInfo): p is BaseInfoNormal => !!p && 'translate_type' in p && !('translate_result' in p)
const isBaseInfoTranslate = (p: BaseInfo): p is BaseInfoTranslate => !!p && 'translate_type' in p && 'translate_result' in p
const isBaseInfoSuggestion = (p: BaseInfo): p is BaseInfoSuggestion => !!p && 'translate_type' in p && 'suggest' in p
const normalizeCiyi = (p: ChineseCi['ciyi']) => (typeof p === 'string' ? [p] : p)
const isSymbolCN = (p: any): p is SymbolCN => 'word_symbol' in p
const isSymbolEN = (p: any): p is SymbolEN => !('word_symbol' in p)

export default defineComponent({
  name: 'IcibaContainer',
  components: {
    IcibaPronunciation,
    Scrollable,
  },
  setup: () => {
    const seperateChineseJieshi = (s: string) => {
      const match = /[（(](.{1,3})[）)](.+)/.exec(s)
      if (match) {
        return [match[1], match[2]]
      }
      return ['', s]
    }

    const handleSuggestionClick = (word: string) => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word,
        param: {
          provider: IcibaProvider.id,
        },
      })
    }

    const handlePlay = (url: string | undefined) => {
      if (!url) {
        return
      }

      playAudio(url)
    }

    return {
      icon: {
        play_speaker_filled_audio_tool_59284,
      },

      isBaseInfoBaseInfoNormal,
      isBaseInfoTranslate,
      isBaseInfoSuggestion,
      isSymbolCN,
      isSymbolEN,

      handlePlay,
      handleSuggestionClick,

      result: computed(() => containerData.data),

      seperateChineseJieshi,
      normalizeCiyi,
    }
  },
})
