import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = tType({
  icon: fallback(keyof(providerIcon[PROVIDER.VOCABULARY]), 'logo'),
  display: fallback(boolean, false),
})

export const defaultData = getFallbackData(type)
