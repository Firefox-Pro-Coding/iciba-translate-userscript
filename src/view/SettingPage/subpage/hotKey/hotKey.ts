import { defineComponent } from 'vue'

import { providerOptions } from '~/constants/constant'
import { store } from '~/service/store'

import Foldable from '~/components/Foldable/Foldable.vue'

export default defineComponent({
  name: 'HotKeySetting',
  props: {
    active: Boolean,
  },
  components: {
    Foldable,
  },
  setup: () => ({
    providerOptions,
    core: store.config.core,
    config: store.config,
  }),
})
