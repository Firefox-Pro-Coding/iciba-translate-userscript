import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  ref,
} from 'vue'

import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import { bus, EVENTS } from '~/service/globalBus'
import { zIndexService, Z_INDEX_KEY } from '~/service/zIndex'
import { store } from '~/service/store'
import { shadowRoot, icibaRoot } from '~/service/shadowRoot'
import {
  ICIBA_CIRCLE_ICON_MAP,
  ICIBA_CIRCLE_ICON_TYPE_MAP,
} from '~/constants'
import { translateService } from '~/service/translate'
import { providers } from '~/provider'
import { IcibaProvider } from '~/provider/Iciba'

interface IcibaCirclePosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export default defineComponent({
  setup: () => {
    const refs = {
      circle: ref<HTMLDivElement>(),
    }

    const state = reactive({
      visible: false,
      word: '',
      currentWord: '',
      zIndex: 0,
      style: {
        top: '0',
        left: '0',
        bottom: 'auto',
        right: 'auto',
      } as IcibaCirclePosition,
    })

    const showIcibaCircle = (e: MouseEvent, word: string) => {
      state.visible = true
      state.word = word
      state.zIndex = zIndexService.gen(Z_INDEX_KEY.GENERAL)
      const calcedPosition = calcMouseEventPosition(e)
      state.style = {
        top: `${calcedPosition.top + store.core.icibaCircleOffsetY}px`,
        left: `${calcedPosition.left + store.core.icibaCircleOffsetX}px`,
      }
    }

    const getSelectionString = () => {
      const selection = window.getSelection()
      if (!selection || !String(selection)) {
        return ''
      }

      return selection.toString().trim()
    }

    const handleSelfMouseUp = (event: MouseEvent) => {
      // have to wait handleContextmenu trigger
      setTimeout(() => {
        state.visible = false
        let provider = IcibaProvider.id
        if (event.button === 0) {
          // 默认 provider
          provider = store.core.defaultProvider
        } else if (event.button === 2 && store.core.icibaCircleRightClick) {
          // 备选 provider
          provider = store.core.icibaCircleRightClickProvider
        }

        bus.emit({
          type: EVENTS.TRANSLATE,
          mouseEvent: event,
          word: state.word,
          param: {
            provider,
          },
        })
        translateService.removeSelection()
      })
    }

    const handleSelfMouseover = (event: MouseEvent) => {
      if (!store.core.mouseOverTranslate) {
        return
      }

      state.visible = false
      bus.emit({
        type: EVENTS.TRANSLATE,
        mouseEvent: event,
        word: state.word,
        param: {
          provider: store.core.defaultProvider,
        },
      })
    }

    const handleMouseUp = async (e: MouseEvent, proxied = false) => {
      // let handleShadowRootClick handle
      if (!proxied && e.target === icibaRoot) {
        return
      }
      if (proxied && e.target === refs.circle.value) {
        return
      }

      const hide = () => {
        state.visible = false
      }

      // Wait for next frame. If user clicks on selection text, it will be
      // cleared on next frame
      await new Promise((rs) => requestAnimationFrame(rs))

      const selectionString = getSelectionString()
      state.currentWord = selectionString
      if (!selectionString) {
        hide()
        return
      }


      if (store.core.pressCtrlToShowCircle && !e.ctrlKey) {
        hide()
        return
      }

      if (store.core.selectionMaxLengthCut
        && selectionString.length > store.core.selectionMaxLength) {
        hide()
        return
      }

      // dummy proof
      const hasShowUpHotkey = store.core.useHotkeyShowUp && !!store.core.showUpHotkey.length
      const hasProviderUsingHotkey = providers.some((p) => p.store.enableHotkey && p.store.hotkey.length)
      const hasHotkey = hasShowUpHotkey || hasProviderUsingHotkey
      if (!store.core.useIcibaCircle && hasHotkey) {
        return
      }

      if (store.core.icibaCircleNoCJK) {
        // 669 is last of Latin Extended Additional
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters#Latin_Extended_Additional
        const hasCJK = Array.from(selectionString).some((v) => v.charCodeAt(0) > 669)
        if (hasCJK) {
          hide()
          return
        }
      }

      showIcibaCircle(e, selectionString)
    }

    const handleShadowRootMouseUp = (e: Event) => {
      handleMouseUp(e as MouseEvent, true)
    }


    const computedStyle = computed(() => ({
      ...state.style,
      zIndex: state.zIndex,
      width: `${store.core.icibaCircleSize}px`,
      height: `${store.core.icibaCircleSize}px`,
    }))

    const iconUrl = computed(() => ICIBA_CIRCLE_ICON_MAP[store.core.icibaCircleIcon])
    const iconType = computed(() => ICIBA_CIRCLE_ICON_TYPE_MAP[store.core.icibaCircleIcon])

    onMounted(() => {
      window.addEventListener('mouseup', handleMouseUp, true)
      shadowRoot.addEventListener('mouseup', handleShadowRootMouseUp, true)
    })

    if (process.env.NODE_ENV === 'development') {
      onUnmounted(() => {
        window.removeEventListener('mouseup', handleMouseUp, true)
        shadowRoot.removeEventListener('mouseup', handleShadowRootMouseUp, true)
      })
    }

    return {
      state,
      refs,
      iconUrl,
      iconType,
      computedStyle,

      m: {
        handleSelfMouseover,
        handleSelfMouseUp,
      },
    }
  },
})
