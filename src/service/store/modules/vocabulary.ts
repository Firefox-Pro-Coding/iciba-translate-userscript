import {
  type as tType,
  TypeOf,
  keyof,
  boolean,
} from 'io-ts'

import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = tType({
  icon: keyof(providerIcon[PROVIDER.VOCABULARY]),
  display: boolean,
})

export const defaultData: TypeOf<typeof type> = {
  icon: 'logo',
  display: false,
}
