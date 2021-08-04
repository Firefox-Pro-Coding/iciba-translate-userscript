import {
  TypeOf,
  keyof,
  boolean,
} from 'io-ts'
import { fallback, fallbackInterface } from '~/util/extendIoTs/fallback'
import { enumType } from '~/util/extendIoTs/enum'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'
import { GOOGLE_DICT_FOLD_STATUS } from '../constant'

const foldStatus = enumType<GOOGLE_DICT_FOLD_STATUS>(GOOGLE_DICT_FOLD_STATUS, 'GOOGLE_DICT_FOLD_STATUS')

export const storeType = fallbackInterface({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(icons), 'type_0_google'),

  foldStatus: fallback(foldStatus, GOOGLE_DICT_FOLD_STATUS.UNFOLD),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = storeType.defaultData

export const store = {
  data: null as any as StoreType,
}
