import * as t from 'io-ts'

import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'

export const type = t.type({
  icon: t.keyof(providerIcon[PROVIDER.BAIDU_TRANSLATE]),
  display: t.boolean,
})

export const defaultData: t.TypeOf<typeof type> = {
  icon: 'baiduIcon',
  display: true,
}
