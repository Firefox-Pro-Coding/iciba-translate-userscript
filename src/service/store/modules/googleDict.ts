import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

const foldStatus = enumType<GOOGLE_DICT_FOLD_STATUS>(GOOGLE_DICT_FOLD_STATUS, 'GOOGLE_DICT_FOLD_STATUS')

export const type = tType({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(providerIcon[PROVIDER.GOOGLE_DICT]), 'type_0_google'),

  foldStatus: fallback(foldStatus, GOOGLE_DICT_FOLD_STATUS.UNFOLD),
})

export const defaultData = getFallbackData(type)
