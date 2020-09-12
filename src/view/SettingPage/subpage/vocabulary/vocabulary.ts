import { defineComponent } from '@vue/composition-api'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.VOCABULARY])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'VocabularySettings',
  components: {
    ProviderCommon,
  },
  setup: () => ({
    form: store.config[PROVIDER.VOCABULARY],
    iconOptions,
  }),
})
