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
import { PROVIDER } from '~/constants/constant'

interface IcibaCirclePosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

const removeSelection = () => {
  const selection = window.getSelection()
  if (!selection) {
    return
  }
  selection.removeAllRanges()
}

export default defineComponent({
  setup: (_props, setupContext) => {
    const $refs: {
      circle: HTMLDivElement
    } = setupContext.refs

    const state = reactive({
      visible: false,
      word: '' as string,
      zIndex: 0 as number,
      style: {
        top: '0',
        left: '0',
        bottom: 'auto',
        right: 'auto',
      } as IcibaCirclePosition,
    })

    const showIcibaCircle = (e: MouseEvent, word: string) => {
      // await sleep(10)
      state.visible = true
      state.word = word
      state.zIndex = zIndexService.gen(Z_INDEX_KEY.GENERAL)
      const calcedPosition = calcMouseEventPosition(e)
      state.style = {
        top: `${calcedPosition.top + store.config.core.icibaCircleOffsetY}px`,
        left: `${calcedPosition.left + store.config.core.icibaCircleOffsetX}px`,
      }
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
        removeSelection()
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

      if (store.config.core.pressCtrlToShowCircle && !e.ctrlKey) {
        state.visible = false
        return
      }

      const selection = window.getSelection()
      if (!selection || !String(selection)) {
        state.visible = false
        return
      }

      const selectionString = selection.toString().trim()
      // only show button if selection is valid
      if (!selectionString.length) {
        state.visible = false
        return
      }

      if (store.config.core.selectionMaxLengthCut
        && selectionString.length > store.config.core.selectionMaxLength) {
        state.visible = false
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
        window.removeEventListener('mouseup', handleMouseUp, false)
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
