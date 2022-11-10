import {
  TypeOf,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, fallbackInterface } from '~/util/extendIoTs/fallback'
import { ALI_API_LANGUAGES } from '~/provider/AliApiTranslate/aliApiLanguages'
import { apiProviderCommonStore } from '~/service/store/provider'
import { icons } from '../icons'

const aliApiLanguage = enumType<ALI_API_LANGUAGES>(ALI_API_LANGUAGES, 'ALI_API_LANGUAGES')

export const storeType = fallbackInterface({
  ...apiProviderCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(icons), 'aliApiIcon'),

  targetLanguage: fallback(aliApiLanguage, ALI_API_LANGUAGES.zh),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = storeType.defaultData

export const store = {
  data: null as any as StoreType,
}
