import {
  type as tType,
  TypeOf,
  boolean,
  keyof,
} from 'io-ts'
import { PROVIDER } from '~/constants/constant'

import providerIcon from '~/constants/icon'

export const type = tType({
  icon: keyof(providerIcon[PROVIDER.URBAN_DICTIONARY]),
  display: boolean,
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'urbanDictionary',
  display: false,
}
