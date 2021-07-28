import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/index.vue'
import settingView from './settings/index.vue'
import { storeType, defaultStore, store } from './store'
import { icons } from './icons'

export const VocabularyProvider = createProvider({
  id: 'VOCABULARY',
  label: 'Vocabulary',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
