import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/index.vue'
import settingView from './settings/index.vue'
import { icons } from './icons'
import { storeType, defaultStore, store } from './store'

export const AliApiTranslateProvider = createProvider({
  id: 'ALI_API_TRANSLATE',
  label: '阿里API翻译',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
