import { defineComponent } from 'vue'

import ProviderCommon from '~/components/providerCommon/providerCommon.vue'
import { icons } from '../icons'
import { store } from '../store'

const iconOptions = Object
  .entries(icons)
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
    form: store.data,
    iconOptions,
  }),
})
