import GOOGLE_TRANSLATE_SQUARE from '~/assets/img/providerIcon/googleTranslate/type_1_translate_281759.svg'
import GOOGLE_TRANSLATE_CIRCLE from '~/assets/img/providerIcon/googleTranslate/type_3_google_814137.svg'
import TRANSLATE_ICON from '~/assets/img/translate_2406387.svg'
import MAG_ICON from '~/assets/img/magnify_929469.svg'

export enum ICIBA_CIRCLE_ICON {
  DEFAULT = 'default',
  GOOGLE_TRANSLATE_SQUARE = 'gtsquare',
  GOOGLE_TRANSLATE_CIRCLE = 'gtcircle',
  GOOGLE_TRANSLATE_TEXT = 'gttext',
  MAG_ICON = 'icondic',
}

export const ICIBA_CIRCLE_ICON_MAP = {
  [ICIBA_CIRCLE_ICON.DEFAULT]: '',
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_SQUARE]: GOOGLE_TRANSLATE_SQUARE,
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_CIRCLE]: GOOGLE_TRANSLATE_CIRCLE,
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_TEXT]: TRANSLATE_ICON,
  [ICIBA_CIRCLE_ICON.MAG_ICON]: MAG_ICON,
}

export const ICIBA_CIRCLE_ICON_TYPE_MAP: Record<ICIBA_CIRCLE_ICON, 'square' | 'circle'> = {
  [ICIBA_CIRCLE_ICON.DEFAULT]: 'circle',
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_SQUARE]: 'square',
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_CIRCLE]: 'circle',
  [ICIBA_CIRCLE_ICON.GOOGLE_TRANSLATE_TEXT]: 'square',
  [ICIBA_CIRCLE_ICON.MAG_ICON]: 'square',
}

export enum GM_STORE_KEY {
  STORE = 'iciba_store',
  SOUGOU_SECCODE = 'sougou_seccode',
  HISTORY = 'history',
}
