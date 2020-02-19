import Vue from 'vue'
import { defineComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { settingPageService } from '~/service/settingPage'
import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.VOCABULARY])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'VocabularySettings',
  components: {
    IconRadioGroup,
  },
  setup: () => {
    const state = reactive({
      form: copy(defaultData[PROVIDER.VOCABULARY]),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config[PROVIDER.VOCABULARY])
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

      store.config[PROVIDER.VOCABULARY] = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      iconOptions,
    }
  },
})
