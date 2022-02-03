import { defineComponent } from 'vue'
import { store } from '~/service/store'
import Foldable from '~/components/Foldable/Foldable.vue'
import { providers } from '~/provider'

export default defineComponent({
  name: 'HotKeySetting',
  components: {
    Foldable,
  },
  props: {
    active: Boolean,
  },
  setup: () => ({
    core: store.core,
    providers,
  }),
})
