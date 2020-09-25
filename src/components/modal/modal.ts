import {
  defineComponent,
  reactive,
  computed,
  watch,
} from 'vue'

import { Z_INDEX_KEY, zIndexService } from '~/service/zIndex'

interface Props {
  open: boolean
  onClose: () => unknown
}

export default defineComponent({
  name: 'ModalComponent',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => {
    const state = reactive({
      visible: false,
      zIndex: 0,
      bodyOverflowXValue: '',
      bodyOverflowYValue: '',
    })

    const handleCloseModal = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) {
        return
      }
      props.onClose()
      document.body.style.overflowX = state.bodyOverflowXValue
      document.body.style.overflowY = state.bodyOverflowYValue
    }

    watch(
      () => props.open,
      () => {
        if (props.open) {
          state.bodyOverflowXValue = document.body.style.overflowX || ''
          state.bodyOverflowYValue = document.body.style.overflowY || ''
          state.zIndex = zIndexService.gen(Z_INDEX_KEY.GENERAL)
        }
        state.visible = props.open
      },
    )

    const modalStyle = computed(() => ({
      zIndex: state.zIndex,
    }))

    return {
      state,
      modalStyle,
      handleCloseModal,
    }
  },
})
