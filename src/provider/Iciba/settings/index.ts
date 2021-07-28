import { defineComponent } from 'vue'

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
  name: 'IcibaSettings',
  components: {
    ProviderCommon,
  },
  setup: () => ({
    form: store.data,
    iconOptions,
  }),
})
