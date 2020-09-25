import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants'
import { SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'

import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

const sougouLanguage = enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES')

export const type = tType({
  ...providerCommonStore,
  display: fallback(boolean, false),
  icon: fallback(keyof(providerIcon[PROVIDER.SOUGOU_TRANSLATE]), 'icon_with_circle'),

  targetLanguage: fallback(sougouLanguage, SOUGOU_LANGUAGES.zhs),
  secondTargetLanguage: fallback(sougouLanguage, SOUGOU_LANGUAGES.en),
})

export const defaultData = getFallbackData(type)
