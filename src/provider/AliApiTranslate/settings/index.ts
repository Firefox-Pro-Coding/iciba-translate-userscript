import { defineComponent, watch, onUnmounted } from 'vue'

import { aliApiLanguagesOptions, ALI_API_LANGUAGES } from '~/provider/AliApiTranslate/aliApiLanguages'
import ApiProviderCommon from '~/components/apiProviderCommon/apiProviderCommon.vue'
import { store } from '../store'
import { icons } from '../icons'

const iconOptions = Object
  .entries(icons)
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'AliApiTranslateSettings',
  components: {
    ApiProviderCommon,
  },
  props: {
    active: Boolean,
  },
  setup: (props) => {
    const form = store.data
    let reset: Array<ALI_API_LANGUAGES> | null = null

    watch(() => [
      form.targetLanguage,
    ], (n, o) => {
      reset = o && n[0] === n[1]
        ? o
        : null
    })

    const doReset = () => {
      if (props.active && reset) {
        form.targetLanguage = reset[0]
      }
    }

    watch(() => props.active, doReset)
    onUnmounted(doReset)

    return {
      iconOptions,
      form,
      languageOptions: aliApiLanguagesOptions,
    }
  },
})
