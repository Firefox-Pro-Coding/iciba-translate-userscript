import { defineComponent } from '@vue/composition-api'
import { lazyLoadHoc } from '~/util/lazyLoadHoc'

import IcibaMain from '~/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/components/SettingPage/SettingPage.vue'

import GoogleDictModal from '~/provider/GoogleDict/container/GoogleDictModal.vue'
import { EVENTS } from './service/globalBus'

export default defineComponent({
  name: 'IcibaAppRoot',
  components: {
    IcibaMain: lazyLoadHoc(IcibaMain, EVENTS.TRANSLATE),
    IcibaCircle,
    SizeHelper,
    SettingPage: lazyLoadHoc(SettingPage, EVENTS.OPEN_SETTING),
    GoogleDictModal: lazyLoadHoc(GoogleDictModal, EVENTS.OPEN_GOOGLE_DICT_MODAL),
  },
})
