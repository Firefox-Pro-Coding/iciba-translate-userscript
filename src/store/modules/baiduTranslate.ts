import * as t from 'io-ts'
import { enumType } from '~/util/extendIoTs'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { BAIDU_LANGUAGES } from '~/constants/baiduLanguages'


export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.BAIDU_TRANSLATE]),
  display: t.boolean,
  targetLanguage: enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES'),
  secondTargetLanguage: enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES'),
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'baiduIcon',
  display: true,
  targetLanguage: BAIDU_LANGUAGES.zh,
  secondTargetLanguage: BAIDU_LANGUAGES.en,
}
