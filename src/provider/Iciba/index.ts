import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/index.vue'
import settingView from './settings/index.vue'
import { icons } from './icons'
import { store, storeType, defaultStore } from './store'

export const IcibaProvider = createProvider({
  id: 'ICIBA',
  label: 'Iciba',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
