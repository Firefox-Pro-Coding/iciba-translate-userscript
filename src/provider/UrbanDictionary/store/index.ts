import {
  keyof,
  boolean,
  TypeOf,
} from 'io-ts'
import { fallback, fallbackInterface } from '~/util/extendIoTs/fallback'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'

export const storeType = fallbackInterface({
  ...providerCommonStore,
  display: fallback(boolean, false),
  icon: fallback(keyof(icons), 'urbanDictionary'),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = storeType.defaultData

export const store = {
  data: null as any as StoreType,
}
