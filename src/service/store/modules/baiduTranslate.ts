import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants'
import providerIcon from '~/constants/icon'
import { BAIDU_LANGUAGES } from '~/constants/baiduLanguages'
import { providerCommonStore } from '../provider'

const baiduLanguage = enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES')

export const type = tType({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(providerIcon[PROVIDER.BAIDU_TRANSLATE]), 'baiduIcon'),

  targetLanguage: fallback(baiduLanguage, BAIDU_LANGUAGES.zh),
  secondTargetLanguage: fallback(baiduLanguage, BAIDU_LANGUAGES.en),
})

export const defaultData = getFallbackData(type)
