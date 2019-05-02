import * as t from 'io-ts'
import { PROVIDER } from '~/constants/constant'

import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.URBAN_DICTIONARY]),
  display: t.boolean,
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'urbanDictionary',
  display: true,
}
