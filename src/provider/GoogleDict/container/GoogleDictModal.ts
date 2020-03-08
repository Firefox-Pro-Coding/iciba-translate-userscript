import Vue from 'vue'
import { defineComponent, reactive, onMounted, computed } from '@vue/composition-api'
import { bus, EVENTS, OpenGoogleDictModalAction } from '~/service/globalBus'
import { store } from '~/service/store'
import { zIndexService, Z_INDEX_KEY } from '~/service/zIndex'

import Scrollable from '~/components/Scrollable/Scrollable.vue'
import ImageLoader from './components/modal/imageLoader/imageLoader.vue'
import UsageOvertime from './components/modal/usageOvertime/usageOvertime.vue'
import Entry from './components/modal/entry/entry.vue'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'

import minus from '~/assets/img/minus.svg'
import plus from '~/assets/img/plus.svg'
import copy from '~/util/copy'
import { Codec } from '../types'

const foldOrder = [
  GOOGLE_DICT_FOLD_STATUS.FOLD,
  GOOGLE_DICT_FOLD_STATUS.HALF_FOLD,
  GOOGLE_DICT_FOLD_STATUS.UNFOLD,
]

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

    const loadFoldStatus = () => {
      if (store.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.FOLD) {
        store.state.googleDict.thesaurusFolded = true
        store.state.googleDict.subsenseFolded = true
      }

      if (store.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.HALF_FOLD) {
        store.state.googleDict.thesaurusFolded = true
        store.state.googleDict.subsenseFolded = false
      }

      if (store.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.UNFOLD) {
        store.state.googleDict.thesaurusFolded = false
        store.state.googleDict.subsenseFolded = false
      }
    }

    const handleOpenModal = (p: OpenGoogleDictModalAction) => {
      state.zIndex = zIndexService.gen(Z_INDEX_KEY.GOOGLE_DICT_MODAL)

      loadFoldStatus()

      state.containerData = copy(p.googleDictData)
      state.id += 1

      Vue.nextTick(() => {
        state.visible = true
      })
    }

    const handleCloseModal = () => {
      state.visible = false
    }

    const handleShrink = () => {
      const index = foldOrder.indexOf(store.config[PROVIDER.GOOGLE_DICT].foldStatus) - 1
      if (index >= 0) {
        store.config[PROVIDER.GOOGLE_DICT].foldStatus = foldOrder[index]
      }
      loadFoldStatus()
    }

    const handleExpand = () => {
      const index = foldOrder.indexOf(store.config[PROVIDER.GOOGLE_DICT].foldStatus) + 1
      if (index < foldOrder.length) {
        store.config[PROVIDER.GOOGLE_DICT].foldStatus = foldOrder[index]
      }
      loadFoldStatus()
    }

    onMounted(() => {
      bus.on(EVENTS.OPEN_GOOGLE_DICT_MODAL, handleOpenModal)
    })

    const shrinkable = computed(() => !store.state.googleDict.thesaurusFolded || !store.state.googleDict.subsenseFolded)
    const expandable = computed(() => store.state.googleDict.thesaurusFolded || store.state.googleDict.subsenseFolded)

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
