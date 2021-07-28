import { defineComponent } from 'vue'
import { store } from '~/service/store'
import Foldable from '~/components/Foldable/Foldable.vue'
import { providers } from '~/provider'

export default defineComponent({
  name: 'HotKeySetting',
  props: {
    active: Boolean,
  },
  components: {
    Foldable,
  },
  setup: () => ({
    core: store.core,
    providers,
  }),
})
