import {
  type as tType,
  TypeOf,
  boolean,
  keyof,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs'

import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = tType({
  icon: keyof(providerIcon[PROVIDER.GOOGLE_DICT]),
  display: boolean,
  foldStatus: enumType<GOOGLE_DICT_FOLD_STATUS>(GOOGLE_DICT_FOLD_STATUS, 'GOOGLE_DICT_FOLD_STATUS'),
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'type_0_google',
  display: true,
  foldStatus: GOOGLE_DICT_FOLD_STATUS.HALF_FOLD,
}
