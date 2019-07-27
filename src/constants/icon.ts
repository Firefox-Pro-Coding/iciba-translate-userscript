import { PROVIDER } from '~/constants/constant'

import searchIcon from '~/assets/img/providerIcon/iciba/search.svg'
import iciba_1362193 from '~/assets/img/providerIcon/iciba/iciba_1362193.svg'

import type_0_google from '~/assets/img/providerIcon/googleDict/type_0_google.svg'
import type_2_search_281764 from '~/assets/img/providerIcon/googleDict/type_2_search_281764.svg'
import type_3_search_281781 from '~/assets/img/providerIcon/googleDict/type_3_search_281781.svg'
import type_4_google_356049 from '~/assets/img/providerIcon/googleDict/type_4_google_356049.svg'

import type_1_translate_281759 from '~/assets/img/providerIcon/googleTranslate/type_1_translate_281759.svg'
import type_2_translate_281776 from '~/assets/img/providerIcon/googleTranslate/type_2_translate_281776.svg'
import type_2_translate_324121 from '~/assets/img/providerIcon/googleTranslate/type_2_translate_324121.svg'
import type_3_google_814137 from '~/assets/img/providerIcon/googleTranslate/type_3_google_814137.svg'

import baiduIcon from '~/assets/img/providerIcon/baiduTranslate/baidu.svg'
import baiduCircle from '~/assets/img/providerIcon/baiduTranslate/baiduCircle.svg'

import icon_with_circle from '~/assets/img/providerIcon/sougouTranslate/icon_with_circle.svg'
import icon_no_circle from '~/assets/img/providerIcon/sougouTranslate/icon_no_circle.svg'

import urbanDictionary from '~/assets/img/providerIcon/urbanDictionary/urbanDictionary.svg'

import bingFlat from '~/assets/img/providerIcon/bingTranslate/flat.svg'
import bingGold from '~/assets/img/providerIcon/bingTranslate/gold.svg'
import bingOutline from '~/assets/img/providerIcon/bingTranslate/outline.svg'
import bingRound from '~/assets/img/providerIcon/bingTranslate/round.svg'

const providerIcon = {
  [PROVIDER.ICIBA]: {
    searchIcon,
    iciba_1362193,
  },
  [PROVIDER.GOOGLE_DICT]: {
    type_0_google,
    type_2_search_281764,
    type_3_search_281781,
    type_4_google_356049,
  },
  [PROVIDER.GOOGLE_TRANSLATE]: {
    type_1_translate_281759,
    type_2_translate_281776,
    type_2_translate_324121,
    type_3_google_814137,
  },
  [PROVIDER.BAIDU_TRANSLATE]: {
    baiduIcon,
    baiduCircle,
  },
  [PROVIDER.SOUGOU_TRANSLATE]: {
    icon_with_circle,
    icon_no_circle,
  },
  [PROVIDER.URBAN_DICTIONARY]: {
    urbanDictionary,
  },
  [PROVIDER.BING_TRANSLATE]: {
    bingFlat,
    bingGold,
    bingOutline,
    bingRound,
  },
}

export default providerIcon
