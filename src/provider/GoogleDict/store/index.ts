import {
  type,
  TypeOf,
  keyof,
  boolean,
} from 'io-ts'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { enumType } from '~/util/extendIoTs/enum'
import { providerCommonStore } from '~/service/store/provider'
import { icons } from '../icons'
import { GOOGLE_DICT_FOLD_STATUS } from '../constant'

const foldStatus = enumType<GOOGLE_DICT_FOLD_STATUS>(GOOGLE_DICT_FOLD_STATUS, 'GOOGLE_DICT_FOLD_STATUS')

export const storeType = type({
  ...providerCommonStore,
  display: fallback(boolean, true),
  icon: fallback(keyof(icons), 'type_0_google'),

  foldStatus: fallback(foldStatus, GOOGLE_DICT_FOLD_STATUS.UNFOLD),
})

export type StoreType = TypeOf<typeof storeType>

export const defaultStore = getFallbackData(storeType)

export const store = {
  data: null as any as StoreType,
}
