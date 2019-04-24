import * as t from 'io-ts'
import { PROVIDER } from '~/constants/constant'
import { SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'

import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.SOUGOU_TRANSLATE]),
  display: t.boolean,
  targetLanguage: t.enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES'),
  secondTargetLanguage: t.enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES'),
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'icon_with_circle',
  display: false,
  targetLanguage: SOUGOU_LANGUAGES.zhs,
  secondTargetLanguage: SOUGOU_LANGUAGES.en,
}
