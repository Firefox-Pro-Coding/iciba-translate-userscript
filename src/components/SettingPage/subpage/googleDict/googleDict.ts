import Vue from 'vue'
import { defineComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { settingPageService } from '~/service/settingPage'
import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'
import providerIcon from '~/constants/icon'
import {
  PROVIDER,
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_MAP,
} from '~/constants/constant'
import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const foldOptions = [
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.FOLD], key: GOOGLE_DICT_FOLD_STATUS.FOLD },
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.HALF_FOLD], key: GOOGLE_DICT_FOLD_STATUS.HALF_FOLD },
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.UNFOLD], key: GOOGLE_DICT_FOLD_STATUS.UNFOLD },
]

const iconOptions = Object
  .entries(providerIcon[PROVIDER.GOOGLE_DICT])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'GoogleDictSettings',
  components: {
    IconRadioGroup,
  },
  setup: () => {
    const state = reactive({
      form: copy(defaultData[PROVIDER.GOOGLE_DICT]),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config[PROVIDER.GOOGLE_DICT])
      Vue.nextTick(() => {
        state.loadingSetting = false
      })
    }

    onMounted(() => {
      loadSettings()
    })

    watch(() => state.form, () => {
      if (state.loadingSetting) {
        return
      }

      store.config[PROVIDER.GOOGLE_DICT] = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      iconOptions,
      foldOptions,
    }
  },
})
