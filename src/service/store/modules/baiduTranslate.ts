import {
  type as tType,
  TypeOf,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { BAIDU_LANGUAGES } from '~/constants/baiduLanguages'


export const type = tType({
  icon: keyof(providerIcon[PROVIDER.BAIDU_TRANSLATE]),
  display: boolean,
  targetLanguage: enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES'),
  secondTargetLanguage: enumType<BAIDU_LANGUAGES>(BAIDU_LANGUAGES, 'BAIDU_LANGUAGES'),
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'baiduIcon',
  display: true,
  targetLanguage: BAIDU_LANGUAGES.zh,
  secondTargetLanguage: BAIDU_LANGUAGES.en,
}
