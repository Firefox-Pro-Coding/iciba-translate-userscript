import Vue from 'vue'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  watch,
} from '@vue/composition-api'

import settingsIcon from '~/assets/img/settings_149837.svg'
import dragIcon from '~/assets/img/drag_462998.svg'
import pinIcon from '~/assets/img/pin_25474.svg'

import { icibaRoot, shadowRoot } from '~/service/shadowRoot'
import { store } from '~/service/store'
import { bus, EVENTS, TranslateAction, HotKeyShowAction, HotKeyTranslateAction } from '~/service/globalBus'
import { translateService } from '~/service/translate'
import { Z_INDEX_KEY, zIndexService } from '~/service/zIndex'
import { hotkeyService } from '~/service/hotkey'
import { getIcon } from '~/provider/provider'

import insideOf from '~/util/insideOf'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import LoadingText from './helper/LoadingText/LoadingText'
import { allProviders, PROVIDER } from '~/constants/constant'

interface Props {
  getIcibaCircle: () => Vue
  getGoogleDictModal: () => Vue
}

const removeSelection = () => {
  const selection = window.getSelection()
  if (selection?.removeAllRanges) {
    selection.removeAllRanges()
  }
}

export default defineComponent({
  name: 'IcibaMain',
  components: {
    LoadingText,
  },
  props: {
    getIcibaCircle: null,
    getGoogleDictModal: null,
  },
  setup: (props: Props, setupContext) => {
    const $refs: {
      icibaMainWrap: HTMLDivElement
      icibaMain: HTMLDivElement
      icibaSearchInput: HTMLInputElement
      sizeHelper: HTMLInputElement
    } = setupContext.refs

    const state = reactive({
      visible: false,
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

    /** 设置 IcibaMain position */
    const setPosition = (e: MouseEvent) => {
      // calc position
      const sizeHelperBounding = $refs.sizeHelper.getBoundingClientRect()
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

    /** 打开设置 */
    const handleOpenSetting = () => {
      state.visible = false
      bus.emit({ type: EVENTS.OPEN_SETTING })
    }

    const showIcibaMain = (e: MouseEvent, autoFocus: boolean) => {
      if (!state.visible) {
        setPosition(e)
        state.visible = true

        if (autoFocus) {
          Vue.nextTick(() => {
            if ($refs.icibaSearchInput) {
              $refs.icibaSearchInput.focus()
            }
          })
        }
      } else {
        // reset if out of bound
        const container = $refs.icibaMain
        if (container) {
          const rect = container.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            setPosition(e)
          }
        }
      }
    }

    /** 查词事件 */
    const handleTranslate = (action: TranslateAction) => {
      if (action.mouseEvent) {
        showIcibaMain(action.mouseEvent, store.config.core.icibaMainInputAutoFocus)
      }
      state.inputText = action.word
      translateService.translate(action)
    }

    /** 查词事件 */
    const handleHotkeyTranslate = (action: HotKeyTranslateAction) => {
      showIcibaMain(action.mouseEvent, store.config.core.providerHotkeyAutoFocus)
      if (action.word) {
        state.inputText = action.word
      }
      translateService.translate({
        type: EVENTS.TRANSLATE,
        word: state.inputText,
        mouseEvent: action.mouseEvent,
        param: {
          provider: action.provider,
        },
      })
    }

    const translateWithProvider = (provider: PROVIDER) => {
      translateService.translate({
        type: EVENTS.TRANSLATE,
        word: state.inputText,
        param: {
          provider,
        },
      })
    }

    const handleInputConfirm = () => {
      translateService.translate({
        type: EVENTS.TRANSLATE,
        word: state.inputText,
        param: {
          provider: translateService.state.lastUsedProvider.value,
        },
      })
    }

    const handleGoogleDictModalOpen = () => { state.visible = false }

    /** 图钉 拖拽 */
    const pinDrag = {
      /** 切换固定状态 */
      handleTogglePinned: () => {
        store.config.core.pinned = !store.config.core.pinned
      },

      /** 图钉拖拽 */
      handlePinDragStart: (e: MouseEvent) => {
        e.preventDefault()
        removeSelection()
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
        const e: MouseEvent = _e as any
        state.drag.ignoreCtrl = false
        if (!insideOf(e.target, $refs.icibaMainWrap) || !e.ctrlKey) {
          return
        }
        if (!store.config.core.pressCtrlToDrag) {
          return
        }
        removeSelection()
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

    const handleShowUp = async (action: HotKeyShowAction) => {
      if (state.visible) {
        setPosition(action.mouseEvent)
        return
      }

      await new Promise((rs) => setTimeout(rs, 0))

      translateService.clearActiveProvider()
      setPosition(action.mouseEvent)
      state.inputText = ''
      state.visible = true

      if (store.config.core.hotkeyIcibaMainInputAutoFocus) {
        Vue.nextTick(() => {
          if ($refs.icibaSearchInput) {
            $refs.icibaSearchInput.focus()
          }
        })
      }
    }

    const handleHotkeyPress = (keys: Array<string>) => {
      const config = store.config

      if (!state.visible || !state.inputText) {
        return
      }

      for (const p of allProviders) {
        const providerConfig = config[p]
        if (!providerConfig.enableHotkey || !hotkeyService.match(keys, providerConfig.hotkey)) {
          continue
        }
        removeSelection()
        translateService.translate({
          type: EVENTS.TRANSLATE,
          word: state.inputText,
          param: {
            provider: p,
          },
        })
      }
    }

    const handleWindowClick = (e: MouseEvent) => {
      // outside shadow-root
      if (e.target !== icibaRoot && (!store.config.core.showPin || !store.config.core.pinned)) {
        state.visible = false
      }
    }

    const handleShadowRootClick = (e: Event) => {
      const googleDictModal = props.getGoogleDictModal()
      const ignoreCondition = [
        Boolean(
          googleDictModal
          && insideOf(e.target, googleDictModal.$el)
          && zIndexService.get(Z_INDEX_KEY.GOOGLE_DICT_MODAL) > state.wrapperStyle.zIndex,
        ),
        insideOf(e.target, $refs.icibaMainWrap),
        insideOf(e.target, props.getIcibaCircle().$el),
        store.config.core.showPin && store.config.core.pinned,
      ]
      if (ignoreCondition.some((v) => v)) {
        return
      }
      state.visible = false
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
        .map((id) => translateService.state.providers.find((p) => p.id === id)!)
        .filter((p) => store.config[p.id].display),
    )

    watch(() => wrapperStyle.value, (style) => {
      if ($refs.icibaMainWrap) {
        Object.assign($refs.icibaMainWrap.style, style)
      }
    }, { deep: true })

    onMounted(() => {
      window.addEventListener('mousedown', handleWindowClick, true)
      window.addEventListener('mousemove', pinDrag.handleDragMove, true)
      window.addEventListener('mouseup', pinDrag.handleDragEnd, true)
      shadowRoot.addEventListener('mousedown', pinDrag.handleDragStart, true)
      shadowRoot.addEventListener('mousedown', handleShadowRootClick, false)
      shadowRoot.addEventListener('keyup', pinDrag.handleDragEnd, true)
      hotkeyService.onHotkeyPress(handleHotkeyPress)

      bus.on(EVENTS.TRANSLATE, handleTranslate)
      bus.on(EVENTS.OPEN_GOOGLE_DICT_MODAL, handleGoogleDictModalOpen)
      bus.on(EVENTS.HOTKEY_SHOW, handleShowUp)
      bus.on(EVENTS.HOTKEY_TRANSLATE, handleHotkeyTranslate)
    })

    // no need to unmounted since it never unmount
    if (process.env.NODE_ENV === 'development') {
      onUnmounted(() => {
        window.removeEventListener('mousedown', handleWindowClick, true)
        window.removeEventListener('mousemove', pinDrag.handleDragMove, true)
        window.removeEventListener('mouseup', pinDrag.handleDragEnd, true)
        shadowRoot.removeEventListener('mousedown', pinDrag.handleDragStart, true)
        shadowRoot.removeEventListener('mousedown', handleShadowRootClick, false)
        shadowRoot.removeEventListener('keyup', pinDrag.handleDragEnd, true)
        hotkeyService.offHotkeyPress(handleHotkeyPress)

        bus.off(EVENTS.TRANSLATE, handleTranslate)
        bus.off(EVENTS.OPEN_GOOGLE_DICT_MODAL, handleGoogleDictModalOpen)
        bus.off(EVENTS.HOTKEY_SHOW, handleShowUp)
        bus.off(EVENTS.HOTKEY_TRANSLATE, handleHotkeyTranslate)
      })
    }

    return {
      icon: {
        settingsIcon,
        dragIcon,
        pinIcon,
      },
      state,
      store,

      mainStyle,

      translateLoading: translateService.state.loading,
      activeProvider: translateService.state.activeProvider,
      showButtonProviders,
      errorMessage: translateService.state.errorMessage,

      m: {
        getIcon,
        pinDrag,
        handleOpenSetting,
        translateWithProvider,
        handleInputConfirm,
      },
    }
  },
})
