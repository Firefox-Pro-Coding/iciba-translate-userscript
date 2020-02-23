import {
  type as tType,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'

import providerIcon from '~/constants/icon'
import { BING_LANGUAGES } from '~/constants/bingLanguages'

const bingLanguage = enumType<BING_LANGUAGES>(BING_LANGUAGES, 'BING_LANGUAGES')

export const type = tType({
  icon: fallback(keyof(providerIcon[PROVIDER.BING_TRANSLATE]), 'bingFlat'),
  display: fallback(boolean, false),
  targetLanguage: fallback(bingLanguage, BING_LANGUAGES.zh),
  secondTargetLanguage: fallback(bingLanguage, BING_LANGUAGES.en),
})

export const defaultData = getFallbackData(type)
