import * as t from 'io-ts'
import { enumType } from '~/util/extendIoTs'
import { PROVIDER } from '~/constants/constant'

import providerIcon from '~/constants/icon'
import { BING_LANGUAGES } from '~/constants/bingLanguages'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.BING_TRANSLATE]),
  display: t.boolean,
  targetLanguage: enumType<BING_LANGUAGES>(BING_LANGUAGES, 'BING_LANGUAGES'),
  secondTargetLanguage: enumType<BING_LANGUAGES>(BING_LANGUAGES, 'BING_LANGUAGES'),
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'bingFlat',
  display: false,
  targetLanguage: BING_LANGUAGES.zh,
  secondTargetLanguage: BING_LANGUAGES.en,
}
