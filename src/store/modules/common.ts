import * as t from 'io-ts'

import { PROVIDER } from '~/constants/constant'

export const type = t.type({
  defaultProvider: t.enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: t.boolean,
  pressCtrlToShowCircle: t.boolean,
  mouseOverTranslate: t.boolean,
  icibaCircleOffsetX: t.number,
  icibaCircleOffsetY: t.number,
})

export const defaultData: t.TypeOf<typeof type> = {
  defaultProvider: PROVIDER.ICIBA,
  pressCtrlToDrag: true,
  pressCtrlToShowCircle: false,
  mouseOverTranslate: false,
  icibaCircleOffsetX: 7,
  icibaCircleOffsetY: 7,
}
