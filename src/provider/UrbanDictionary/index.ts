import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/index.vue'
import settingView from './settings/index.vue'
import { storeType, defaultStore, store } from './store'
import { icons } from './icons'

export const UrbanDictionaryProvider = createProvider({
  id: 'URBAN_DICTIONARY',
  label: 'Urban Dictionary',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
