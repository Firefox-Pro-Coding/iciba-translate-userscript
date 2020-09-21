import { defineComponent, reactive, onMounted, computed, nextTick } from 'vue'
import { bus, EVENTS, OpenGoogleDictModalAction } from '~/service/globalBus'
import { store } from '~/service/store'
import { zIndexService, Z_INDEX_KEY } from '~/service/zIndex'

import Scrollable from '~/components/Scrollable/Scrollable.vue'
import ImageLoader from './components/modal/imageLoader/imageLoader.vue'
import UsageOvertime from './components/modal/usageOvertime/usageOvertime.vue'
import Entry from './components/modal/entry/entry.vue'
import {
  PROVIDER,
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_NEXT_MAP,
  GOOGLE_DICT_FOLD_STATUS_PREV_MAP,
} from '~/constants/constant'

import minus from '~/assets/img/minus.svg'
import plus from '~/assets/img/plus.svg'
import copy from '~/util/copy'
import { Codec } from '../types'

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
  },
  setup: () => {
    const state = reactive({
      zIndex: 0,
      containerData: null as null | Codec['dictionaryData'],
      visible: false,
      id: 0,
    })

    const handleOpenModal = (p: OpenGoogleDictModalAction) => {
      state.zIndex = zIndexService.gen(Z_INDEX_KEY.GOOGLE_DICT_MODAL)

      state.containerData = copy(p.googleDictData)
      state.id += 1

      nextTick(() => {
        state.visible = true
      })
    }

    const handleCloseModal = () => {
      state.visible = false
    }


    const handleShrink = () => {
      const status = store.config[PROVIDER.GOOGLE_DICT].foldStatus
      store.config[PROVIDER.GOOGLE_DICT].foldStatus = GOOGLE_DICT_FOLD_STATUS_NEXT_MAP[status]
    }

    const handleExpand = () => {
      const status = store.config[PROVIDER.GOOGLE_DICT].foldStatus
      store.config[PROVIDER.GOOGLE_DICT].foldStatus = GOOGLE_DICT_FOLD_STATUS_PREV_MAP[status]
    }

    onMounted(() => {
      bus.on({
        event: EVENTS.OPEN_GOOGLE_DICT_MODAL,
        listener: handleOpenModal,
      })
    })

    const shrinkable = computed(() => store.config[PROVIDER.GOOGLE_DICT].foldStatus < GOOGLE_DICT_FOLD_STATUS.FOLD_SUBSENSE)
    const expandable = computed(() => store.config[PROVIDER.GOOGLE_DICT].foldStatus > GOOGLE_DICT_FOLD_STATUS.UNFOLD)

    return {
      state,
      icon,
      shrinkable,
      expandable,

      handleCloseModal,
      handleShrink,
      handleExpand,
    }
  },
})
