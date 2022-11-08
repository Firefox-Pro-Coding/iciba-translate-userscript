import {
  TypeOf,
  keyof,
  boolean,
  string,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, fallbackInterface } from '~/util/extendIoTs/fallback'
import { GOOGLE_LANGUAGES } from '~/provider/GoogleTranslate/googleLanguages'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'

const googleLanguage = enumType<GOOGLE_LANGUAGES>(GOOGLE_LANGUAGES, 'GOOGLE_LANGUAGES')

export const storeType = fallbackInterface({
  ...providerCommonStore,
  icon: fallback(keyof(icons), 'type_1_translate_281759'),
  display: fallback(boolean, true),

  targetLanguage: fallback(googleLanguage, GOOGLE_LANGUAGES.zh),
  secondTargetLanguage: fallback(googleLanguage, GOOGLE_LANGUAGES.en),

  xsrfToken: fallback(string, ''),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = storeType.defaultData

export const store = {
  data: null as any as StoreType,
}
