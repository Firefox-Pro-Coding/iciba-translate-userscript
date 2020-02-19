import {
  defineComponent,
  reactive,
  onMounted,
} from '@vue/composition-api'

import { bus, EVENTS } from '~/service/globalBus'
import { Z_INDEX_KEY, zIndexService } from '~/service/zIndex'

import ITabs from './components/tabs/tabs.vue'
import ITab from './components/tab/tab.vue'
import ITabsItems from './components/tabsItems/tabsItems.vue'
import ITabItem from './components/tabItem/tabItem.vue'

import About from './subpage/about/about.vue'
import CoreSetting from './subpage/coreSetting/coreSetting.vue'
import Iciba from './subpage/iciba/iciba.vue'
import GoogleDict from './subpage/googleDict/googleDict.vue'
import GoogleTranslate from './subpage/googleTranslate/googleTranslate.vue'
import BaiduTranslate from './subpage/baiduTranslate/baiduTranslate.vue'
import SougouTranslate from './subpage/sougouTranslate/sougouTranslate.vue'
import UrbanDictionary from './subpage/urbanDictionary/urbanDictionary.vue'
import BingTranslate from './subpage/bingTranslate/bingTranslate.vue'
import Vocabulary from './subpage/vocabulary/vocabulary.vue'

export default defineComponent({
  components: {
    ITabs,
    ITab,
    ITabsItems,
    ITabItem,

    About,
    CoreSetting,
    Iciba,
    GoogleDict,
    GoogleTranslate,
    BaiduTranslate,
    SougouTranslate,
    UrbanDictionary,
    BingTranslate,
    Vocabulary,
  },
  setup: () => {
    const state = reactive({
      tab: 1,
      visible: false,
      zIndex: 0,
      bodyOverflowXValue: '',
      bodyOverflowYValue: '',
    })

    const openSetting = () => {
      state.bodyOverflowXValue = document.body.style.overflowX || ''
      state.bodyOverflowYValue = document.body.style.overflowY || ''
      state.zIndex = zIndexService.gen(Z_INDEX_KEY.GENERAL)
      state.tab = 1
      state.visible = true
    }

    const handleCloseSetting = () => {
      document.body.style.overflowX = state.bodyOverflowXValue
      document.body.style.overflowY = state.bodyOverflowYValue
      state.visible = false
    }

    onMounted(() => {
      bus.on(EVENTS.OPEN_SETTING, openSetting)
    })

    return {
      state,

      handleCloseSetting,
    }
  },
})
