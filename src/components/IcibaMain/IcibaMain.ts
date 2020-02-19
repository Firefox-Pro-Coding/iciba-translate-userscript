import Vue from 'vue'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  watch,
} from '@vue/composition-api'

import settings_149837 from '~/assets/img/settings_149837.svg'
import drag_462998 from '~/assets/img/drag_462998.svg'
import pin_25474 from '~/assets/img/pin_25474.svg'

import { icibaRoot, shadowRoot } from '~/service/shadowRoot'
import { store } from '~/service/store'
import { bus, EVENTS, TranslateAction } from '~/service/globalBus'
import { translateService } from '~/service/translate'
import { Z_INDEX_KEY, zIndexService } from '~/service/zIndex'

import AbstractTranslateProvider from '~/provider/AbstractTranslateProvider'

import insideOf from '~/util/insideOf'
import calcMouseEventPosition from '~/util/calcMouseEventPosition'

import LoadingText from './helper/LoadingText/LoadingText'

interface Props {
  getSizeHelper: () => Vue
  getIcibaCircle: () => Vue
  getGoogleDictModal: () => Vue
}

/* eslint-disable @typescript-eslint/no-use-before-define, @typescript-eslint/no-unused-vars */
export default defineComponent({
  name: 'IcibaMain',
  components: {
    LoadingText,
  },
  props: {
    getSizeHelper: null,
    getIcibaCircle: null,
    getGoogleDictModal: null,
  },
  setup: (props: Props, setupContext) => {
    const $refs: {
      icibaMainWrap: HTMLDivElement
      icibaMain: HTMLDivElement
      icibaSearchInput: HTMLInputElement
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

      icibaContainerStyle: {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },

      icibaMainStyle: {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        translateX: 0,
        translateY: 0,
        zIndex: 0,
      },
    })

    /** 打开设置 */
    const handleOpenSetting = () => {
      state.visible = false
      bus.emit({ type: EVENTS.OPEN_SETTING })
    }

    /** 查词事件 */
    const handleTranslate = (action: TranslateAction) => {
      const show = () => {
        if (!action.mouseEvent) {
          return
        }
        if (!state.visible) {
          setPosition(action.mouseEvent)
        }
        state.visible = true

        // not at top
        const googleDictModal = props.getGoogleDictModal()
        if (googleDictModal && state.icibaMainStyle.zIndex < zIndexService.get(Z_INDEX_KEY.GOOGLE_DICT_MODAL)) {
          setPosition(action.mouseEvent)
          return
        }

        // out of bound
        const container = $refs.icibaMain
        if (container) {
          const rect = container.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            setPosition(action.mouseEvent)
          }
        }
      }

      show()

      state.inputText = action.word

      if (action.param) {
        translateService.translate(action)
      }
    }

    const translateWithProvider = (provider: AbstractTranslateProvider) => {
      handleTranslate({
        type: EVENTS.TRANSLATE,
        word: state.inputText,
        param: {
          provider: provider.uniqName,
        },
      })
    }

    const handleInputConfirm = () => {
      translateWithProvider(
        translateService.state.providers.find((v) => v.uniqName === translateService.state.lastUsedProvider.value)!,
      )
    }

    /** 设置 IcibaMain position */
    const setPosition = (e: MouseEvent, force: boolean = false) => {
      if (!force && state.visible && zIndexService.isTop(state.icibaMainStyle.zIndex)) {
        return
      }

      // calc position
      const sizeHelperBounding = props.getSizeHelper().$el.getBoundingClientRect()
      const availableSpace = {
        x: sizeHelperBounding.left - e.clientX,
        y: sizeHelperBounding.top - e.clientY,
      }

      state.icibaContainerStyle = {
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

      state.icibaMainStyle = {
        top: `${calcedPosition.top}px`,
        left: `${calcedPosition.left}px`,
        bottom: 'auto',
        right: 'auto',
        translateX: 0,
        translateY: 0,
        zIndex: zIndexService.gen(Z_INDEX_KEY.GENERAL),
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
          && zIndexService.get(Z_INDEX_KEY.GOOGLE_DICT_MODAL) > state.icibaMainStyle.zIndex,
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

    const onGoogleDictModalOpen = () => { state.visible = false }

    /** 图钉 拖拽 */
    const pinDrag = {
      /** 切换固定状态 */
      handleTogglePinned: () => {
        store.config.core.pinned = !store.config.core.pinned
        store.saveConfig()
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
            x: state.icibaMainStyle.translateX,
            y: state.icibaMainStyle.translateY,
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
            x: state.icibaMainStyle.translateX,
            y: state.icibaMainStyle.translateY,
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

        window.requestAnimationFrame(() => {
          state.icibaMainStyle.translateX = state.drag.startTransform.x + deltaX
          state.icibaMainStyle.translateY = state.drag.startTransform.y + deltaY
        })
      },

      handleDragEnd: () => {
        state.drag.dragging = false
      },
    }

    const removeSelection = () => {
      const selection = window.getSelection()
      if (selection?.removeAllRanges) {
        selection.removeAllRanges()
      }
    }

    const icibaMainWrapStyle = computed(() => ({
      top: state.icibaMainStyle.top,
      bottom: state.icibaMainStyle.bottom,
      left: state.icibaMainStyle.left,
      right: state.icibaMainStyle.right,
      transform: `translate(${state.icibaMainStyle.translateX}px, ${state.icibaMainStyle.translateY}px)`,
      zIndex: state.icibaMainStyle.zIndex,
    }))

    const icibaMainStyle = computed(() => ({
      top: state.icibaContainerStyle.top,
      bottom: state.icibaContainerStyle.bottom,
      left: state.icibaContainerStyle.left,
      right: state.icibaContainerStyle.right,
      width: `${store.config.core.icibaMainWidth}px`,
    }))

    const showButtonProviders = computed(
      () => translateService.state.providers
        .filter((item) => store.config[item.uniqName].display),
    )

    watch(() => state.visible, () => {
      Vue.nextTick(() => {
        if (state.visible && $refs.icibaSearchInput) {
          $refs.icibaSearchInput.focus()
        }
      })
    })

    onMounted(() => {
      window.addEventListener('mousedown', handleWindowClick, true)
      window.addEventListener('mousemove', pinDrag.handleDragMove, true)
      window.addEventListener('mouseup', pinDrag.handleDragEnd, true)
      shadowRoot.addEventListener('mousedown', pinDrag.handleDragStart, true)
      shadowRoot.addEventListener('mousedown', handleShadowRootClick, false)
      shadowRoot.addEventListener('keyup', pinDrag.handleDragEnd, true)

      bus.on(EVENTS.TRANSLATE, handleTranslate)
      bus.on(EVENTS.OPEN_GOOGLE_DICT_MODAL, onGoogleDictModalOpen)
    })

    // no need to unmounted cause never unmount
    if (process.env.NODE_ENV === 'development') {
      onUnmounted(() => {
        window.removeEventListener('mousedown', handleWindowClick, true)
        window.removeEventListener('mousemove', pinDrag.handleDragMove, true)
        window.removeEventListener('mouseup', pinDrag.handleDragEnd, true)
        shadowRoot.removeEventListener('mousedown', pinDrag.handleDragStart, true)
        shadowRoot.removeEventListener('mousedown', handleShadowRootClick, false)
        shadowRoot.removeEventListener('keyup', pinDrag.handleDragEnd, true)

        bus.off(EVENTS.TRANSLATE, handleTranslate)
        bus.off(EVENTS.OPEN_GOOGLE_DICT_MODAL, onGoogleDictModalOpen)
      })
    }

    return {
      icon: {
        settings_149837,
        drag_462998,
        pin_25474,
      },
      state,
      store,

      icibaMainWrapStyle,
      icibaMainStyle,

      translateLoading: translateService.state.loading,
      activeProvider: translateService.state.activeProvider,
      showButtonProviders,
      errorMessage: translateService.state.errorMessage,

      m: {
        pinDrag,
        handleOpenSetting,
        translateWithProvider,
        handleInputConfirm,
      },
    }
  },
})
