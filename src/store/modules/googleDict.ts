import * as t from 'io-ts'

import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.GOOGLE_DICT]),
  display: t.boolean,
  foldStatus: t.enumType<GOOGLE_DICT_FOLD_STATUS>(GOOGLE_DICT_FOLD_STATUS, 'GOOGLE_DICT_FOLD_STATUS'),
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'type_0_google',
  display: true,
  foldStatus: GOOGLE_DICT_FOLD_STATUS.HALF_FOLD,
}
