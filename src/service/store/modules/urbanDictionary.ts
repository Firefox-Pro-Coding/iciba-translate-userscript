import {
  type as tType,
  boolean,
  keyof,
} from 'io-ts'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = tType({
  icon: fallback(keyof(providerIcon[PROVIDER.URBAN_DICTIONARY]), 'urbanDictionary'),
  display: fallback(boolean, false),
})

export const defaultData = getFallbackData(type)
