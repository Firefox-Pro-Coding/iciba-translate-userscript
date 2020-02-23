import { defineComponent } from '@vue/composition-api'

import { store } from '~/service/store'

import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const iconOptions = Object
  .entries(providerIcon[PROVIDER.VOCABULARY])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'VocabularySettings',
  components: {
    IconRadioGroup,
  },
  setup: () => ({
    form: store.config[PROVIDER.VOCABULARY],
    iconOptions,
  }),
})
