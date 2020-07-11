import { defineComponent, onMounted, watch, onUnmounted } from '@vue/composition-api'
import { lazyLoadHoc } from '~/util/lazyLoadHoc'

import IcibaMain from '~/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/components/IcibaCircle/IcibaCircle.vue'
import SettingPage from '~/components/SettingPage/SettingPage.vue'

import GoogleDictModal from '~/provider/GoogleDict/container/GoogleDictModal.vue'
import { EVENTS, bus } from './service/globalBus'
import { hotkeyService } from './service/hotkey'
import { store } from './service/store'
import { translateService } from './service/translate'
import { registerMenuCommand } from './util/gmapi'
import { scrollBarWidthService } from './service/scrollBarWidth'

export default defineComponent({
  name: 'IcibaAppRoot',
  components: {
    IcibaMain: lazyLoadHoc(IcibaMain, [
      EVENTS.TRANSLATE,
      EVENTS.HOTKEY_SHOW,
      EVENTS.HOTKEY_TRANSLATE,
    ]),
    IcibaCircle,
    SettingPage: lazyLoadHoc(SettingPage, EVENTS.OPEN_SETTING),
    GoogleDictModal: lazyLoadHoc(GoogleDictModal, EVENTS.OPEN_GOOGLE_DICT_MODAL),
  },
  setup: () => {
    let lastMouseUpEvent: MouseEvent | null = null
    let lastMouseMoveEvent: MouseEvent | null = null

    const handleMouseUp = (e: MouseEvent) => {
      lastMouseUpEvent = e
    }
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveEvent = e
    }

    const handleShowUpHotkeyPress = (keys: Array<string>, stop: () => void) => {
      if (!store.config.core.useHotkeyShowUp) {
        return
      }

      const hotkeyMatch = hotkeyService.match(store.config.core.showUpHotkey, keys)
      if (!hotkeyMatch || !lastMouseMoveEvent) {
        return
      }
      stop()

      bus.emit({
        type: EVENTS.HOTKEY_SHOW,
        mouseEvent: lastMouseMoveEvent,
      })
    }

    const handleTranslateHotkeyPress = (keys: Array<string>, stop: () => void) => {
      const word = window.getSelection()?.toString().trim() ?? ''

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
          provider: matchedProvider,
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

      watch(() => store.config.core.useHotkeyShowUp, (showUp) => {
        if (!showUp) {
          hotkeyService.offHotkeyPress(handleHotkeyPress)
          return
        }
        hotkeyService.onHotkeyPress(handleHotkeyPress)
      }, { immediate: true })

      registerMenuCommand('打开iciba划词翻译设置', () => {
        bus.emit({
          type: EVENTS.OPEN_SETTING,
        })
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
  },
})
