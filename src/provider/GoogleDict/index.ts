import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/GoogleDictContainer.vue'
import settingView from './settings/index.vue'
import { icons } from './icons'
import { storeType, defaultStore, store } from './store'

export const GoogleDictProvider = createProvider({
  id: 'GOOGLE_DICT',
  label: 'google字典',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
