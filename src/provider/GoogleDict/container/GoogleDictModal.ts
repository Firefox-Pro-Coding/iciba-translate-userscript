import { defineComponent, reactive, onMounted, computed, nextTick } from 'vue'
import { bus, EVENTS, OpenGoogleDictModalAction } from '~/service/globalBus'

import ModalComponent from '~/components/modal/modal.vue'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import ImageLoader from './components/modal/imageLoader/imageLoader.vue'
import UsageOvertime from './components/modal/usageOvertime/usageOvertime.vue'
import Entry from './components/modal/entry/entry.vue'
import {
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_NEXT_MAP,
  GOOGLE_DICT_FOLD_STATUS_PREV_MAP,
} from '../constant'

import minus from '~/assets/img/minus.svg'
import plus from '~/assets/img/plus.svg'
import copy from '~/util/copy'
import { viewService } from '~/service/view'
import { Codec } from '../types'
import { store } from '../store'

const icon = {
  minus,
  plus,
}

export default defineComponent({
  name: 'GoogleDictModal',
  components: {
    ImageLoader,
    UsageOvertime,
    Entry,
    Scrollable,
    ModalComponent,
  },
  setup: () => {
    const state = reactive({
      containerData: null as null | Codec['dictionaryData'],
      id: 0,
    })

    const handleOpenModal = (p: OpenGoogleDictModalAction) => {
      state.containerData = copy(p.googleDictData)
      state.id += 1

      nextTick(() => {
        viewService.openGoogleDictModal()
      })
    }

    const handleCloseModal = () => {
      viewService.closeGoogleDictModal()
    }

    const handleShrink = () => {
      const status = store.data.foldStatus
      store.data.foldStatus = GOOGLE_DICT_FOLD_STATUS_NEXT_MAP[status]
    }

    const handleExpand = () => {
      const status = store.data.foldStatus
      store.data.foldStatus = GOOGLE_DICT_FOLD_STATUS_PREV_MAP[status]
    }

    onMounted(() => {
      bus.on({
        event: EVENTS.OPEN_GOOGLE_DICT_MODAL,
        listener: handleOpenModal,
      })
    })

    const visible = computed(() => viewService.state.googleDictModal)
    const shrinkable = computed(() => store.data.foldStatus < GOOGLE_DICT_FOLD_STATUS.FOLD_SUBSENSE)
    const expandable = computed(() => store.data.foldStatus > GOOGLE_DICT_FOLD_STATUS.UNFOLD)

    return {
      state,
      visible,
      icon,
      shrinkable,
      expandable,

      handleCloseModal,
      handleShrink,
      handleExpand,
    }
  },
})
