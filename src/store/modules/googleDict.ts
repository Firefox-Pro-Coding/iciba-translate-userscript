import * as t from 'io-ts'

import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.GOOGLE_DICT]),
  display: t.boolean,
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'type_0_google',
  display: true,
}
