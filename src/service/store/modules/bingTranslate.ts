import {
  type as tType,
  TypeOf,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { PROVIDER } from '~/constants/constant'

import providerIcon from '~/constants/icon'
import { BING_LANGUAGES } from '~/constants/bingLanguages'

export const type = tType({
  icon: keyof(providerIcon[PROVIDER.BING_TRANSLATE]),
  display: boolean,
  targetLanguage: enumType<BING_LANGUAGES>(BING_LANGUAGES, 'BING_LANGUAGES'),
  secondTargetLanguage: enumType<BING_LANGUAGES>(BING_LANGUAGES, 'BING_LANGUAGES'),
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'bingFlat',
  display: false,
  targetLanguage: BING_LANGUAGES.zh,
  secondTargetLanguage: BING_LANGUAGES.en,
}
