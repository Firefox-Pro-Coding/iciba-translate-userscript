import { defineComponent, watch, onUnmounted } from 'vue'

import { baiduLanguagesOptions, BAIDU_LANGUAGES } from '~/provider/BaiduTranslate/baiduLanguages'
import ProviderCommon from '~/components/providerCommon/providerCommon.vue'
import { store } from '../store'
import { icons } from '../icons'

const iconOptions = Object
  .entries(icons)
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'BaiduTranslateSettings',
  components: {
    ProviderCommon,
  },
  props: {
    active: Boolean,
  },
  setup: (props) => {
    const form = store.data
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
