import Vue from 'vue'
import { defineComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { settingPageService } from '~/service/settingPage'
import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'
import { providerOptions } from '~/constants/constant'

export default defineComponent({
  name: 'CoreSettings',
  setup: () => {
    const state = reactive({
      form: copy(defaultData.core),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config.core)
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

      if (state.form.defaultProvider === state.form.icibaCircleRightClickProvider) {
        return
      }

      store.config.core = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      providerOptions,
    }
  },
})
