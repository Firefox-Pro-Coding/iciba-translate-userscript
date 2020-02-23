import { defineComponent } from '@vue/composition-api'

import { store } from '~/service/store'
import providerIcon from '~/constants/icon'
import {
  PROVIDER,
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_MAP,
} from '~/constants/constant'
import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

const foldOptions = [
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.FOLD], key: GOOGLE_DICT_FOLD_STATUS.FOLD },
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.HALF_FOLD], key: GOOGLE_DICT_FOLD_STATUS.HALF_FOLD },
  { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.UNFOLD], key: GOOGLE_DICT_FOLD_STATUS.UNFOLD },
]

const iconOptions = Object
  .entries(providerIcon[PROVIDER.GOOGLE_DICT])
  .map(([k, v]) => ({
    icon: v,
    key: k,
  }))

export default defineComponent({
  name: 'GoogleDictSettings',
  components: {
    IconRadioGroup,
  },
  setup: () => ({
    form: store.config[PROVIDER.GOOGLE_DICT],
    iconOptions,
    foldOptions,
  }),
})
