import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER, GOOGLE_TRANSLATE_HOST } from '~/constants/constant'
import { GOOGLE_LANGUAGES } from '~/constants/googleLanguages'

import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

const translateHost = enumType<GOOGLE_TRANSLATE_HOST>(GOOGLE_TRANSLATE_HOST, 'GOOGLE_TRANSLATE_HOST')
const googleLanguage = enumType<GOOGLE_LANGUAGES>(GOOGLE_LANGUAGES, 'GOOGLE_LANGUAGES')

export const type = tType({
  ...providerCommonStore,
  icon: fallback(keyof(providerIcon[PROVIDER.GOOGLE_TRANSLATE]), 'type_1_translate_281759'),
  display: fallback(boolean, true),

  translateHost: fallback(translateHost, GOOGLE_TRANSLATE_HOST.GOOGLE_COM),
  targetLanguage: fallback(googleLanguage, GOOGLE_LANGUAGES.zh),
  secondTargetLanguage: fallback(googleLanguage, GOOGLE_LANGUAGES.en),
})

export const defaultData = getFallbackData(type)
