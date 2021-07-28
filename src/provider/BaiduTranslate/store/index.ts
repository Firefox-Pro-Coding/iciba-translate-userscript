import {
  type,
  TypeOf,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { BAIDU_LANGUAGES } from '~/provider/BaiduTranslate/baiduLanguages'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'

const baiduLanguage = enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES')

export const storeType = type({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(icons), 'baiduIcon'),

  targetLanguage: fallback(baiduLanguage, BAIDU_LANGUAGES.zh),
  secondTargetLanguage: fallback(baiduLanguage, BAIDU_LANGUAGES.en),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = getFallbackData(storeType)

export const store = {
  data: null as any as StoreType,
}
