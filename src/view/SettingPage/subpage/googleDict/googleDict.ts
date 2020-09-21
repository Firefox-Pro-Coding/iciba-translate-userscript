import { defineComponent } from 'vue'

import { store } from '~/service/store'
import providerIcon from '~/constants/icon'
import {
  PROVIDER,
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_MAP,
} from '~/constants/constant'

import ProviderCommon from '../../providerCommon/providerCommon.vue'

const foldOptions = [
  GOOGLE_DICT_FOLD_STATUS.UNFOLD,
  GOOGLE_DICT_FOLD_STATUS.FOLD_SUBSENSE,
  GOOGLE_DICT_FOLD_STATUS.FOLD_EXAMPLES,
  GOOGLE_DICT_FOLD_STATUS.FOLD_THESAURUS,
].map((v) => ({
  label: GOOGLE_DICT_FOLD_STATUS_MAP[v],
  key: v,
}))

const iconOptions = Object
  .entries(providerIcon[PROVIDER.GOOGLE_DICT])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'GoogleDictSettings',
  components: {
    ProviderCommon,
  },
  setup: () => ({
    form: store.config[PROVIDER.GOOGLE_DICT],
    iconOptions,
    foldOptions,
  }),
})
