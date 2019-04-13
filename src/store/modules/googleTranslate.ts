import * as t from 'io-ts'
import { PROVIDER, GOOGLE_TRANSLATE_HOST } from '~/constants/constant'
import { GOOGLE_LANGUAGES } from '~/constants/googleLanguages'

import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.GOOGLE_TRANSLATE]),
  display: t.boolean,
  translateHost: t.enumType<GOOGLE_TRANSLATE_HOST>(GOOGLE_TRANSLATE_HOST, 'GOOGLE_TRANSLATE_HOST'),
  targetLanguage: t.enumType<GOOGLE_LANGUAGES>(GOOGLE_LANGUAGES, 'GOOGLE_LANGUAGES'),
  secondTargetLanguage: t.enumType<GOOGLE_LANGUAGES>(GOOGLE_LANGUAGES, 'GOOGLE_LANGUAGES'),
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'type_1_translate_281759',
  display: true,
  translateHost: GOOGLE_TRANSLATE_HOST.GOOGLE_COM,
  targetLanguage: GOOGLE_LANGUAGES.zh,
  secondTargetLanguage: GOOGLE_LANGUAGES.en,
}
