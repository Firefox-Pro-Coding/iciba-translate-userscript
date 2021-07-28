import { createProvider } from '~/provider/create'
import { translate } from './translate'
import translateView from './container/index.vue'
import settingView from './settings/index.vue'
import { icons } from './icons'
import { storeType, defaultStore, store } from './store'

export const GoogleTranslateProvider = createProvider({
  id: 'GOOGLE_TRANSLATE',
  label: '谷歌翻译',
  translate,
  translateView,
  settingView,
  icons,
  storeWrapper: store,
  storeType,
  defaultStore,
})
