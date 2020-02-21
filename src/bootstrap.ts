import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import Ripple from './util/diretives/ripple'
import NoOverscroll from './util/diretives/no-overscroll'

import Checkbox from '~/components/SettingPage/components/checkbox/checkbox.vue'
import RadioGroup from '~/components/SettingPage/components/radioGroup/radioGroup.vue'
import Radio from '~/components/SettingPage/components/radio/radio.vue'
import Slider from '~/components/SettingPage/components/slider/slider.vue'
import IIcon from '~/components/IIcon/IIcon.vue'
import { clickOutside } from './util/diretives/click-outside'

Vue.use(VueCompositionApi)

Vue.directive('ripple', Ripple)
Vue.directive('no-overscroll', NoOverscroll)
Vue.directive('click-outside', clickOutside)

Vue.component('i-checkbox', Checkbox)
Vue.component('i-radio-group', RadioGroup)
Vue.component('i-radio', Radio)
Vue.component('i-slider', Slider)
Vue.component('i-icon', IIcon)
