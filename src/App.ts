// eslint-disable-next-line import/no-unassigned-import
import '~/util/trustedHTMLHack'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { lazyLoadHoc } from '~/util/lazyLoadHoc'

import IcibaMain from '~/view/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/view/IcibaCircle/IcibaCircle.vue'
import SettingPage from '~/view/SettingPage/SettingPage.vue'
import HistoryModal from '~/view/HistoryModal/HistoryModal.vue'

import GoogleDictModal from '~/provider/GoogleDict/container/GoogleDictModal.vue'
import { EVENTS, bus } from './service/globalBus'
import { hotkeyService } from './service/hotkey'
import { store } from './service/store'
import { translateService } from './service/translate'
import { viewService } from './service/view'
import { registerMenuCommand } from './util/gmapi'
import { scrollBarWidthService } from './service/scrollBarWidth'
import { getSelectionText } from './util/getSelectionText'

export default defineComponent({
  name: 'IcibaAppRoot',
  components: {
    IcibaMain: lazyLoadHoc(IcibaMain, [
      EVENTS.TRANSLATE,
      EVENTS.HOTKEY_SHOW,
      EVENTS.HOTKEY_TRANSLATE,
    ]),
    IcibaCircle,
    HistoryModal,
    SettingPage,
    GoogleDictModal,
  },
  setup: () => {
    const refs = {
      icibaCircle: ref<HTMLDivElement>(),
    }
    let lastMouseUpEvent: MouseEvent | null = null
    let lastMouseMoveEvent: MouseEvent | null = null

    const handleMouseUp = (e: MouseEvent) => {
      lastMouseUpEvent = e
    }
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveEvent = e
    }

    const handleShowUpHotkeyPress = (keys: Array<string>, stop: () => void) => {
      if (!store.core.useHotkeyShowUp) {
        return
      }

      const hotkeyMatch = hotkeyService.match(store.core.showUpHotkey, keys)
      if (!hotkeyMatch || !lastMouseMoveEvent) {
        return
      }
      stop()

      bus.emit({
        type: EVENTS.HOTKEY_SHOW,
        mouseEvent: lastMouseMoveEvent,
        word: getSelectionText(),
      })
    }

    const handleTranslateHotkeyPress = (keys: Array<string>, stop: () => void) => {
      const word = getSelectionText()

      if (!lastMouseUpEvent) {
        return
      }

      const matchedProvider = hotkeyService.getHotkeyMatchedProvider(keys)
      if (matchedProvider) {
        const mouseEvent = lastMouseUpEvent
        translateService.removeSelection()
        stop()
        bus.emit({
          type: EVENTS.HIDE_CIRCLE,
        })
        bus.emit({
          type: EVENTS.HOTKEY_TRANSLATE,
          word,
          mouseEvent,
          provider: matchedProvider.id,
        })
      }
    }

    const handleHotkeyPress = (keys: Array<string>, _e: MouseEvent, stop: () => void) => {
      handleShowUpHotkeyPress(keys, stop)
      handleTranslateHotkeyPress(keys, stop)
    }

    onMounted(() => {
      window.addEventListener('mouseup', handleMouseUp, true)
      window.addEventListener('mousemove', handleMouseMove, true)

      hotkeyService.onHotkeyPress(handleHotkeyPress)

      registerMenuCommand('打开iciba划词翻译设置', () => {
        viewService.openSettings()
      })

      scrollBarWidthService.init()
    })

    if (process.env.NODE_ENV === 'development') {
      onUnmounted(() => {
        window.removeEventListener('mouseup', handleMouseUp, true)
        window.removeEventListener('mousemove', handleMouseMove, true)
        hotkeyService.offHotkeyPress(handleHotkeyPress)
      })
    }

    return {
      refs,
    }
  },
})
