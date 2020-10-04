import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  watch,
  nextTick,
  ref,
} from 'vue'

import settingsIcon from '~/assets/img/settings_149837.svg'
import dragIcon from '~/assets/img/drag_462998.svg'
import pinIcon from '~/assets/img/pin_25474.svg'
import historyIcon from '~/assets/img/history.svg'

import { icibaRoot, shadowRoot } from '~/service/shadowRoot'
import { store } from '~/service/store'
import { translateService } from '~/service/translate'
import { Z_INDEX_KEY, zIndexService } from '~/service/zIndex'
import {
  bus,
  EVENTS,
  TranslateAction,
  HotKeyShowAction,
  HotKeyTranslateAction,
} from '~/service/globalBus'

import { getIcon } from '~/provider/provider'
import { PROVIDER } from '~/constants'
import insideOf from '~/util/insideOf'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import LoadingText from './LoadingText/LoadingText'
import { viewService } from '~/service/view'

interface Props {
  getIcibaCircle: () => ReturnType<typeof defineComponent>
}

export default defineComponent({
  name: 'IcibaMain',
  components: { LoadingText },
  props: {
    getIcibaCircle: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => {
    const refs = {
      icibaMainWrap: ref<HTMLDivElement>(),
      icibaMain: ref<HTMLDivElement>(),
      icibaSearchInput: ref<HTMLInputElement>(),
      sizeHelper: ref<HTMLInputElement>(),
    }

    const state = reactive({
      inputFocused: false,
      inputText: '',
      stickBoxVisible: false,
      drag: {
        dragging: false,
        ignoreCtrl: false,
        startPoint: { x: 0, y: 0 },
        startTransform: { x: 0, y: 0 },
      },

      mainStyle: {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },

      wrapperStyle: {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        translateX: 0,
        translateY: 0,
        zIndex: 0,
      },
    })

    const focusInput = (selectAll = false) => {
      nextTick(() => {
        const input = refs.icibaSearchInput.value
        if (input) {
          const textLength = state.inputText.length
          input.focus()
          input.selectionStart = selectAll ? 0 : textLength
          input.selectionEnd = textLength
        }
      })
    }

    /** 设置 IcibaMain position */
    const setPosition = (e: MouseEvent) => {
      if (!refs.sizeHelper.value) {
        return
      }
      const sizeHelperBounding = refs.sizeHelper.value.getBoundingClientRect()
      const availableSpace = {
        x: sizeHelperBounding.left - e.clientX,
        y: sizeHelperBounding.top - e.clientY,
      }

      state.mainStyle = {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        ...{
          ...availableSpace.x < store.config.core.icibaMainWidth
            ? { right: '0' }
            : { left: '0' },
          ...availableSpace.y < 250
            ? { bottom: '0' }
            : { top: '0' },
        },
      }

      const calcedPosition = calcMouseEventPosition(e)

      state.wrapperStyle = {
        top: `${calcedPosition.top}px`,
        left: `${calcedPosition.left}px`,
        bottom: 'auto',
        right: 'auto',
        translateX: 0,
        translateY: 0,
        zIndex: zIndexService.gen(Z_INDEX_KEY.GENERAL),
      }
    }

    const showIcibaMain = (e: MouseEvent, autoFocus: boolean) => {
      if (!viewService.state.icibaMain) {
        setPosition(e)
        viewService.openIcibaMain()
        if (autoFocus) {
          focusInput()
        }
        return
      }

      // reset if out of bound
      const container = refs.icibaMain.value
      if (container) {
        const rect = container.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setPosition(e)
        }
      }
    }

    const listeners = {
      /** 查词事件 */
      onTranslate: (action: TranslateAction) => {
        if (action.mouseEvent) {
          showIcibaMain(action.mouseEvent, store.config.core.icibaMainInputAutoFocus)
        }
        state.inputText = action.word
        translateService.translate(action)
      },

      /** 热键显示 */
      onHotKeyShowUp: (action: HotKeyShowAction) => {
        setPosition(action.mouseEvent)
        state.inputText = action.word ?? ''
        translateService.clearActiveProvider()
        showIcibaMain(action.mouseEvent, store.config.core.hotkeyIcibaMainInputAutoFocus)
      },

      /** 热键查词 */
      onHotkeyTranslate: (action: HotKeyTranslateAction) => {
        if (!viewService.state.icibaMain) {
          if (!action.word) {
            return
          }
          showIcibaMain(action.mouseEvent, store.config.core.providerHotkeyAutoFocus)
        }

        state.inputText = action.word || state.inputText

        translateService.translate({
          type: EVENTS.TRANSLATE,
          word: state.inputText,
          mouseEvent: action.mouseEvent,
          param: {
            provider: action.provider,
          },
        })

        if (store.config.core.providerHotkeyAutoFocus) {
          focusInput()
        }
      },

      onGoogleDictModalOpen: () => {
        viewService.closeIcibaMain()
      },

      onWindowClick: (e: MouseEvent) => {
        // outside shadow-root
        if (e.target !== icibaRoot && (!store.config.core.showPin || !store.config.core.pinned)) {
          viewService.closeIcibaMain()
        }
      },

      onShadowRootClick: (e: Event) => {
        if (!refs.icibaMainWrap.value) {
          return
        }
        const ignoreCondition = [
          insideOf(e.target, refs.icibaMainWrap.value),
          insideOf(e.target, props.getIcibaCircle().$el),
          store.config.core.showPin && store.config.core.pinned,
        ]
        if (ignoreCondition.some((v) => v)) {
          return
        }
        viewService.closeIcibaMain()
      },
    }

    const methods = {
      handleOpenSetting: () => {
        viewService.openSettings()
      },

      handleOpenHistory: () => {
        viewService.openHistory()
      },

      handleTranslateWithProvider: (provider: PROVIDER) => {
        translateService.translate({
          type: EVENTS.TRANSLATE,
          word: state.inputText,
          param: {
            provider,
          },
        })
      },

      handleInputEnter: () => {
        translateService.translate({
          type: EVENTS.TRANSLATE,
          word: state.inputText,
          param: {
            provider: translateService.state.lastUsedProvider,
          },
        })
      },
    }

    /** 图钉 拖拽 */
    const pinDrag = {
      /** 切换固定状态 */
      handleTogglePinned: () => {
        store.config.core.pinned = !store.config.core.pinned
      },

      /** 图钉拖拽 */
      handlePinDragStart: (e: MouseEvent) => {
        e.preventDefault()
        translateService.removeSelection()
        state.drag = {
          dragging: true,
          ignoreCtrl: true,
          startPoint: {
            x: e.screenX,
            y: e.screenY,
          },
          startTransform: {
            x: state.wrapperStyle.translateX,
            y: state.wrapperStyle.translateY,
          },
        }
      },

      /** 窗体拖拽 */
      handleDragStart: (_e: Event) => {
        if (!refs.icibaMainWrap.value) {
          return
        }
        const e: MouseEvent = _e as any
        state.drag.ignoreCtrl = false
        if (!insideOf(e.target, refs.icibaMainWrap.value) || !e.ctrlKey) {
          return
        }
        if (!store.config.core.pressCtrlToDrag) {
          return
        }
        translateService.removeSelection()
        e.preventDefault()
        state.drag = {
          dragging: true,
          ignoreCtrl: false,
          startPoint: {
            x: e.screenX,
            y: e.screenY,
          },
          startTransform: {
            x: state.wrapperStyle.translateX,
            y: state.wrapperStyle.translateY,
          },
        }
      },

      handleDragMove: (_e: Event) => {
        const e: MouseEvent = _e as any
        if (!state.drag.dragging || (!state.drag.ignoreCtrl && !e.ctrlKey)) {
          return
        }
        const deltaX = e.screenX - state.drag.startPoint.x
        const deltaY = e.screenY - state.drag.startPoint.y

        state.wrapperStyle.translateX = state.drag.startTransform.x + deltaX
        state.wrapperStyle.translateY = state.drag.startTransform.y + deltaY
      },

      handleDragEnd: () => {
        state.drag.dragging = false
      },
    }

    const wrapperStyle = computed(() => {
      const { translateX, translateY, ...rest } = state.wrapperStyle
      return {
        ...rest,
        transform: `translate(${state.wrapperStyle.translateX}px, ${state.wrapperStyle.translateY}px)`,
      }
    })

    const mainStyle = computed(() => ({
      ...state.mainStyle,
      width: `${store.config.core.icibaMainWidth}px`,
    }))

    const showButtonProviders = computed(
      () => store.config.core.providerOrder
        .map((id) => translateService.providers.find((p) => p.id === id)!)
        .filter((p) => store.config[p.id].display),
    )

    const visible = computed(() => viewService.state.icibaMain)

    watch(
      () => wrapperStyle.value,
      (style) => {
        if (refs.icibaMainWrap.value) {
          Object.assign(refs.icibaMainWrap.value.style, style)
        }
      },
      { deep: true, immediate: true },
    )

    onMounted(() => {
      window.addEventListener('mousedown', listeners.onWindowClick, true)
      window.addEventListener('mousemove', pinDrag.handleDragMove, true)
      window.addEventListener('mouseup', pinDrag.handleDragEnd, true)
      shadowRoot.addEventListener('mousedown', pinDrag.handleDragStart, true)
      shadowRoot.addEventListener('mousedown', listeners.onShadowRootClick, false)
      shadowRoot.addEventListener('keyup', pinDrag.handleDragEnd, true)

      bus.on({ event: EVENTS.TRANSLATE, listener: listeners.onTranslate })
      bus.on({ event: EVENTS.OPEN_GOOGLE_DICT_MODAL, listener: listeners.onGoogleDictModalOpen })
      bus.on({ event: EVENTS.HOTKEY_SHOW, listener: listeners.onHotKeyShowUp })
      bus.on({ event: EVENTS.HOTKEY_TRANSLATE, listener: listeners.onHotkeyTranslate })
    })

    // no need to unmounted since it never unmount
    if (process.env.NODE_ENV === 'development') {
      onUnmounted(() => {
        window.removeEventListener('mousedown', listeners.onWindowClick, true)
        window.removeEventListener('mousemove', pinDrag.handleDragMove, true)
        window.removeEventListener('mouseup', pinDrag.handleDragEnd, true)
        shadowRoot.removeEventListener('mousedown', pinDrag.handleDragStart, true)
        shadowRoot.removeEventListener('mousedown', listeners.onShadowRootClick, false)
        shadowRoot.removeEventListener('keyup', pinDrag.handleDragEnd, true)

        bus.off({ event: EVENTS.TRANSLATE, listener: listeners.onTranslate })
        bus.off({ event: EVENTS.OPEN_GOOGLE_DICT_MODAL, listener: listeners.onGoogleDictModalOpen })
        bus.off({ event: EVENTS.HOTKEY_SHOW, listener: listeners.onHotKeyShowUp })
        bus.off({ event: EVENTS.HOTKEY_TRANSLATE, listener: listeners.onHotkeyTranslate })
      })
    }

    return {
      icon: {
        settingsIcon,
        dragIcon,
        pinIcon,
        historyIcon,
      },
      state,
      visible,
      refs,
      store,

      mainStyle,

      translateLoading: computed(() => translateService.state.loading),
      activeProvider: translateService.activeProvider,
      showButtonProviders,
      errorMessage: computed(() => translateService.state.errorMessage),

      m: {
        getIcon,
        pinDrag,
        ...methods,
      },
    }
  },
})
