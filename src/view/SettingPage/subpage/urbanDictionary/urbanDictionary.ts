import { defineComponent } from 'vue'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.URBAN_DICTIONARY])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'UrbanDictionarySettings',
  components: {
    ProviderCommon,
  },
  setup: () => ({
    form: store.config[PROVIDER.URBAN_DICTIONARY],
    iconOptions,
  }),
})
