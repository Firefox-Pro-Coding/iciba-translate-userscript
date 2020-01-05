import Vue from 'vue'
import { createComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { settingPageService } from '~/service/settingPage'
import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { sougouLanguagesOptions } from '~/constants/sougouLanguages'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.SOUGOU_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default createComponent({
  name: 'SougouTranslateSettings',
  components: {
    IconRadioGroup,
  },
  setup: () => {
    const state = reactive({
      form: copy(defaultData[PROVIDER.SOUGOU_TRANSLATE]),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config[PROVIDER.SOUGOU_TRANSLATE])
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

      if (state.form.targetLanguage === state.form.secondTargetLanguage) {
        return
      }

      store.config[PROVIDER.SOUGOU_TRANSLATE] = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      iconOptions,
      languageOptions: sougouLanguagesOptions,
    }
  },
})
