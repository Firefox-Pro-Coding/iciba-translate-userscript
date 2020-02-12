import {
  type as tType,
  TypeOf,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { PROVIDER } from '~/constants/constant'
import { SOUGOU_LANGUAGES } from '~/constants/sougouLanguages'

import providerIcon from '~/constants/icon'

export const type = tType({
  icon: keyof(providerIcon[PROVIDER.SOUGOU_TRANSLATE]),
  display: boolean,
  targetLanguage: enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES'),
  secondTargetLanguage: enumType<SOUGOU_LANGUAGES>(SOUGOU_LANGUAGES, 'SOUGOU_LANGUAGES'),
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'icon_with_circle',
  display: false,
  targetLanguage: SOUGOU_LANGUAGES.zhs,
  secondTargetLanguage: SOUGOU_LANGUAGES.en,
}
