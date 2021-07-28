import {
  type,
  keyof,
  boolean,
  TypeOf,
} from 'io-ts'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'

export const storeType = type({
  ...providerCommonStore,
  display: fallback(boolean, false),
  icon: fallback(keyof(icons), 'urbanDictionary'),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = getFallbackData(storeType)

export const store = {
  data: null as any as StoreType,
}
