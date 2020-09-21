import { defineComponent, watch, onUnmounted } from 'vue'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { baiduLanguagesOptions, BAIDU_LANGUAGES } from '~/constants/baiduLanguages'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.BAIDU_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'BaiduTranslateSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderCommon,
  },
  setup: (props) => {
    const form = store.config[PROVIDER.BAIDU_TRANSLATE]
    let reset: Array<BAIDU_LANGUAGES> | null = null

    watch(() => [
      form.targetLanguage,
      form.secondTargetLanguage,
    ], (n, o) => {
      reset = o && n[0] === n[1]
        ? o
        : null
    })

    const doReset = () => {
      if (props.active && reset) {
        form.targetLanguage = reset[0]
        form.secondTargetLanguage = reset[1]
      }
    }

    watch(() => props.active, doReset)
    onUnmounted(doReset)

    return {
      iconOptions,
      form,
      languageOptions: baiduLanguagesOptions,
    }
  },
})
