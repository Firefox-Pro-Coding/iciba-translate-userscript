import Vue from 'vue'
import { createComponent, reactive, onMounted, watch } from '@vue/composition-api'

import { defaultData, store } from '~/service/store'
import { settingPageService } from '~/service/settingPage'
import copy from '~/util/copy'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { baiduLanguagesOptions } from '~/constants/baiduLanguages'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.BAIDU_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default createComponent({
  name: 'BaiduTranslateSettings',
  components: {
    IconRadioGroup,
  },
  setup: () => {
    const state = reactive({
      form: copy(defaultData[PROVIDER.BAIDU_TRANSLATE]),
      loadingSetting: true,
    })

    const loadSettings = () => {
      state.form = copy(store.config[PROVIDER.BAIDU_TRANSLATE])
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

      store.config[PROVIDER.BAIDU_TRANSLATE] = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      iconOptions,
      languageOptions: baiduLanguagesOptions,
    }
  },
})
