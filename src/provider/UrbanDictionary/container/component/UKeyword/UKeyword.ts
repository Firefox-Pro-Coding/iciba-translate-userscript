import { createComponent, reactive, onMounted, watch } from '@vue/composition-api'

import urbanBus from '../../bus'
import { bus, EVENTS } from '~/service/globalBus'
import { PROVIDER } from '~/constants/constant'

export default createComponent({
  name: 'UrbanDictionaryKeyword',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup: (props, ctx) => {
    const $refs: {
      span: HTMLSpanElement
    } = ctx.refs

    const state = reactive({
      id: 0,
      visible: false,
      visibleTimeout: 0,
    })

    const handleClick = () => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word: props.content,
        param: {
          provider: PROVIDER.URBAN_DICTIONARY,
        },
      })
    }

    const showTooltip = () => {
      if (state.visibleTimeout) {
        window.clearTimeout(state.visibleTimeout)
      }

      state.visibleTimeout = window.setTimeout(() => {
        state.visible = true
      }, 200)
    }

    const hideTooltip = () => {
      window.clearTimeout(state.visibleTimeout)
      state.visibleTimeout = 0
      state.visible = false
    }


    onMounted(() => {
      state.id = urbanBus.genId()
    })

    watch(() => state.visible, () => {
      if (state.visible) {
        const rect = $refs.span.getBoundingClientRect()
        urbanBus.emit(urbanBus.events.SHOW_TOOLTIP, {
          top: rect.bottom,
          left: rect.right,
          id: state.id,
          text: props.content,
        })
      } else {
        urbanBus.emit(urbanBus.events.HIDE_TOOLTIP, { id: state.id })
      }
    })

    return {
      props,
      handleClick,
      showTooltip,
      hideTooltip,
    }
  },
})
