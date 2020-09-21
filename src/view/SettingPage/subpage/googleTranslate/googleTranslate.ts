import { defineComponent, watch, onUnmounted } from 'vue'

import { store } from '~/service/store'
import providerIcon from '~/constants/icon'
import { googleLanguagesOptions, GOOGLE_LANGUAGES } from '~/constants/googleLanguages'
import {
  GOOGLE_TRANSLATE_HOST,
  GOOGLE_TRANSLATE_HOST_MAP,
  PROVIDER,
} from '~/constants/constant'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.GOOGLE_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

const hostOptions = [
  { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_COM], key: GOOGLE_TRANSLATE_HOST.GOOGLE_COM },
  { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_CN], key: GOOGLE_TRANSLATE_HOST.GOOGLE_CN },
]

export default defineComponent({
  name: 'GoogleTranslateSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderCommon,
  },
  setup: (props) => {
    const form = store.config[PROVIDER.GOOGLE_TRANSLATE]
    let reset: Array<GOOGLE_LANGUAGES> | null = null

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
      hostOptions,
      languageOptions: googleLanguagesOptions,
    }
  },
})
