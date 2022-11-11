import { defineComponent, reactive } from 'vue'

import ProviderCommon from '~/components/providerCommon/providerCommon.vue'
import { icons } from '../icons'
import { store } from '../store'
import { GOOGLE_DICT_FOLD_STATUS, GOOGLE_DICT_FOLD_STATUS_MAP } from '../constant'

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
  .entries(icons)
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'GoogleDictSettings',
  components: {
    ProviderCommon,
  },
  setup: () => reactive({
    get form() {
      return store.data
    },
    iconOptions,
    foldOptions,
  }),
})
