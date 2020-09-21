import { defineComponent, reactive, onMounted, watch, ref } from 'vue'

import urbanBus, { NAMES } from '../../bus'
import { bus, EVENTS } from '~/service/globalBus'
import { PROVIDER } from '~/constants/constant'

export default defineComponent({
  name: 'UrbanDictionaryKeyword',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup: (props) => {
    const refs = {
      span: ref<HTMLSpanElement>(),
    }

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
        if (refs.span.value) {
          const rect = refs.span.value.getBoundingClientRect()
          urbanBus.emit(NAMES.SHOW_TOOLTIP, {
            top: rect.bottom,
            left: rect.right,
            id: state.id,
            text: props.content,
          })
        }
      } else {
        urbanBus.emit(NAMES.HIDE_TOOLTIP, { id: state.id })
      }
    })

    return {
      props,
      refs,
      handleClick,
      showTooltip,
      hideTooltip,
    }
  },
})
