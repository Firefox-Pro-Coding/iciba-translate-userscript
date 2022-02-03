import {
  defineComponent,
  reactive,
  computed,
} from 'vue'

import ITabs from '~/components/tabs/tabs.vue'
import ITab from '~/components/tab/tab.vue'
import ITabsItems from '~/components/tabsItems/tabsItems.vue'
import ITabItem from '~/components/tabItem/tabItem.vue'
import ModalComponent from '~/components/modal/modal.vue'
import { viewService } from '~/service/view'
import { providers } from '~/provider'

import About from './subpage/about/about.vue'
import CoreSetting from './subpage/coreSetting/coreSetting.vue'
import HotKey from './subpage/hotKey/hotKey.vue'
// import Iciba from './subpage/iciba/iciba.vue'
// import GoogleDict from './subpage/googleDict/googleDict.vue'
// import GoogleTranslate from './subpage/googleTranslate/googleTranslate.vue'
// import BaiduTranslate from './subpage/baiduTranslate/baiduTranslate.vue'
// import SougouTranslate from './subpage/sougouTranslate/sougouTranslate.vue'
// import UrbanDictionary from './subpage/urbanDictionary/urbanDictionary.vue'
// import BingTranslate from './subpage/bingTranslate/bingTranslate.vue'
// import Vocabulary from './subpage/vocabulary/vocabulary.vue'


export default defineComponent({
  name: 'SettingPage',
  components: {
    ITabs,
    ITab,
    ITabsItems,
    ITabItem,
    ModalComponent,

    About,
    CoreSetting,
    HotKey,
    // Iciba,
    // GoogleDict,
    // GoogleTranslate,
    // BaiduTranslate,
    // SougouTranslate,
    // UrbanDictionary,
    // BingTranslate,
    // Vocabulary,
  },
  setup: () => {
    const state = reactive({
      tab: 1,
    })

    const handleCloseSetting = () => {
      viewService.closeSettings()
    }

    const visible = computed(() => viewService.state.setting)

    return {
      state,
      visible,
      providersPage: providers.map((v) => v.settingView),
      providersLabel: providers.map((v) => v.label),
      handleCloseSetting,
    }
  },
})
