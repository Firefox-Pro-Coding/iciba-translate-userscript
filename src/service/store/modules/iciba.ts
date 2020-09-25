import {
  type as tType,
  keyof,
  boolean,
} from 'io-ts'

import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants'
import providerIcon from '~/constants/icon'
import { providerCommonStore } from '../provider'

export const type = tType({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(providerIcon[PROVIDER.ICIBA]), 'searchIcon'),
})

export const defaultData = getFallbackData(type)
