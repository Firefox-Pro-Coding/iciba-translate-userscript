import { defineComponent, watch, onUnmounted } from '@vue/composition-api'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { sougouLanguagesOptions, SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.SOUGOU_TRANSLATE])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'SougouTranslateSettings',
  props: {
    active: Boolean,
  },
  components: {
    ProviderCommon,
  },
  setup: (props) => {
    const form = store.config[PROVIDER.SOUGOU_TRANSLATE]
    let reset: Array<SOUGOU_LANGUAGES> | null = null

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

    watch(() => props.active, doReset, { lazy: true })
    onUnmounted(doReset)

    return {
      form,
      iconOptions,
      languageOptions: sougouLanguagesOptions,
    }
  },
})
