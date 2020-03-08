import {
  type as tType,
  keyof,
} from 'io-ts'

import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

export const type = tType({
  icon: fallback(keyof(providerIcon[PROVIDER.ICIBA]), 'searchIcon'),
  ...providerCommonStore,
})

export const defaultData = getFallbackData(type)
