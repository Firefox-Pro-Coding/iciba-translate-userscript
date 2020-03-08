import { defineComponent, onMounted, watch } from '@vue/composition-api'
import { lazyLoadHoc } from '~/util/lazyLoadHoc'

import IcibaMain from '~/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/components/IcibaCircle/IcibaCircle.vue'
import SettingPage from '~/components/SettingPage/SettingPage.vue'

import GoogleDictModal from '~/provider/GoogleDict/container/GoogleDictModal.vue'
import { EVENTS, bus } from './service/globalBus'
import { hotkeyService } from './service/hotkey'
import { store } from './service/store'

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
    const handleShowUpHotkeyPress = (keys: Array<string>, e: MouseEvent) => {
      if (!store.config.core.useHotkeyShowUp) {
        return
      }

      const hotkeyMatch = hotkeyService.match(store.config.core.showUpHotkey, keys)
      if (hotkeyMatch) {
        bus.emit({
          type: EVENTS.HOTKEY_SHOW,
          mouseEvent: e,
        })
      }
    }

    const handleHotkeyPress = (keys: Array<string>, e: MouseEvent) => {
      handleShowUpHotkeyPress(keys, e)
    }

    onMounted(() => {
      watch(() => store.config.core.useHotkeyShowUp || true, (showUp) => {
        if (!showUp) {
          hotkeyService.offHotkeyPress(handleHotkeyPress)
          return
        }
        hotkeyService.onHotkeyPress(handleHotkeyPress)
      })
    })

    if (process.env.NODE_ENV === 'development') {
      hotkeyService.offHotkeyPress(handleHotkeyPress)
    }
  },
})
