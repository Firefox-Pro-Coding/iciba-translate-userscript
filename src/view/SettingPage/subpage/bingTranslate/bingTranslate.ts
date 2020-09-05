import { defineComponent, watch, onUnmounted } from '@vue/composition-api'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { bingLanguagesOptions, BING_LANGUAGES } from '~/constants/bingLanguages'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.BING_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'BingTranslateSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderCommon,
  },
  setup: (props) => {
    const form = store.config[PROVIDER.BING_TRANSLATE]
    let reset: Array<BING_LANGUAGES> | null = null

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
      form,
      iconOptions,
      languageOptions: bingLanguagesOptions,
    }
  },
})
