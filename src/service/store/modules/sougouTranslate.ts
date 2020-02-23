import {
  type as tType,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'
import { SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'

import providerIcon from '~/constants/icon'

const sougouLanguage = enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES')

export const type = tType({
  icon: fallback(keyof(providerIcon[PROVIDER.SOUGOU_TRANSLATE]), 'icon_with_circle'),
  display: fallback(boolean, false),
  targetLanguage: fallback(sougouLanguage, SOUGOU_LANGUAGES.zhs),
  secondTargetLanguage: fallback(sougouLanguage, SOUGOU_LANGUAGES.en),
})

export const defaultData = getFallbackData(type)
