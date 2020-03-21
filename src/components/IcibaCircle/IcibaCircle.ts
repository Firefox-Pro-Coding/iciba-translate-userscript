import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  reactive,
} from '@vue/composition-api'

import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import { bus, EVENTS } from '~/service/globalBus'
import { zIndexService, Z_INDEX_KEY } from '~/service/zIndex'
import { store } from '~/service/store'
import { shadowRoot, icibaRoot } from '~/service/shadowRoot'
import { PROVIDER, allProviders } from '~/constants/constant'
import { translateService } from '~/service/translate'

interface IcibaCirclePosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export default defineComponent({
  setup: (_props, setupContext) => {
    const $refs: {
      circle: HTMLDivElement
    } = setupContext.refs

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
        top: `${calcedPosition.top + store.config.core.icibaCircleOffsetY}px`,
        left: `${calcedPosition.left + store.config.core.icibaCircleOffsetX}px`,
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

        let provider = PROVIDER.ICIBA
        if (event) {
          if (event.button === 0) {
            // 默认 provider
            provider = store.config.core.defaultProvider
          } else if (event.button === 2 && store.config.core.icibaCircleRightClick) {
            // 备选 provider
            provider = store.config.core.icibaCircleRightClickProvider
          }
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
      if (!store.config.core.mouseOverTranslate) {
        return
      }

      state.visible = false
      bus.emit({
        type: EVENTS.TRANSLATE,
        mouseEvent: event,
        word: state.word,
        param: {
          provider: store.config.core.defaultProvider,
        },
      })
    }

    const handleMouseUp = (e: MouseEvent, proxied = false) => {
      // let handleShadowRootClick handle
      if (!proxied && e.target === icibaRoot) {
        return
      }
      if (proxied && e.target === $refs.circle) {
        return
      }

      const hide = () => {
        state.visible = false
      }

      const selectionString = getSelectionString()
      state.currentWord = selectionString
      if (!selectionString) {
        hide()
        return
      }

      const config = store.config

      if (config.core.pressCtrlToShowCircle && !e.ctrlKey) {
        hide()
        return
      }

      if (config.core.selectionMaxLengthCut
        && selectionString.length > config.core.selectionMaxLength) {
        hide()
        return
      }

      // dummy proof
      const hasShowUpHotkey = config.core.useHotkeyShowUp && config.core.showUpHotkey.length
      const hasProviderUsingHotkey = allProviders.some((p) => config[p].enableHotkey && config[p].hotkey.length)
      const hasHotkey = hasShowUpHotkey || hasProviderUsingHotkey
      if (!config.core.useIcibaCircle && hasHotkey) {
        return
      }

      showIcibaCircle(e, selectionString)
    }

    const handleShadowRootMouseUp = (e: Event) => {
      handleMouseUp(e as MouseEvent, true)
    }

    const computedStyle = computed(() => ({
      ...state.style,
      zIndex: state.zIndex,
      width: `${store.config.core.icibaCircleSize}px`,
      height: `${store.config.core.icibaCircleSize}px`,
    }))

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
      computedStyle,

      m: {
        handleSelfMouseover,
        handleSelfMouseUp,
      },
    }
  },
})
