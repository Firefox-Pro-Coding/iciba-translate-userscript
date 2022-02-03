import { defineComponent, watch, onUnmounted } from 'vue'

import { googleLanguagesOptions, GOOGLE_LANGUAGES } from '~/provider/GoogleTranslate/googleLanguages'
import ProviderCommon from '~/components/providerCommon/providerCommon.vue'
import {
  GOOGLE_TRANSLATE_HOST,
  GOOGLE_TRANSLATE_HOST_MAP,
} from '../constant'
import { store } from '../store'
import { icons } from '../icons'

const iconOptions = Object
  .entries(icons)
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
  components: {
    ProviderCommon,
  },
  props: {
    active: Boolean,
  },
  setup: (props) => {
    const form = store.data
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
