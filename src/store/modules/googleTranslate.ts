import * as t from 'io-ts'
import { PROVIDER, GOOGLE_TRANSLATE_HOST } from '~/constants/constant'

import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.GOOGLE_TRANSLATE]),
  translateHost: t.enumType<GOOGLE_TRANSLATE_HOST>(GOOGLE_TRANSLATE_HOST, 'GOOGLE_TRANSLATE_HOST'),
  targetLanguage: t.string,
  secondTargetLanguage: t.string,
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'type_1_translate_281759',
  translateHost: GOOGLE_TRANSLATE_HOST.GOOGLE_COM,
  targetLanguage: 'zh-CN',
  secondTargetLanguage: 'en',
}
