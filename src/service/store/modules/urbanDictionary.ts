import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

export const type = tType({
  ...providerCommonStore,
  display: fallback(boolean, false),
  icon: fallback(keyof(providerIcon[PROVIDER.URBAN_DICTIONARY]), 'urbanDictionary'),
})

export const defaultData = getFallbackData(type)
