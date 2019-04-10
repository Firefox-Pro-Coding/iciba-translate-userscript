import * as t from 'io-ts'

import { PROVIDER } from '~/constants/constant'

export const type = t.type({
  defaultProvider: t.enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: t.boolean,
  pressCtrlToShowCircle: t.boolean,
  mouseOverTranslate: t.boolean,
  icibaCircleOffsetX: t.number,
  icibaCircleOffsetY: t.number,
  selectionMaxLengthCut: t.boolean,
  selectionMaxLength: t.number,
})

export const defaultData: t.TypeOf<typeof type> = {
  defaultProvider: PROVIDER.ICIBA,
  pressCtrlToDrag: true,
  pressCtrlToShowCircle: false,
  mouseOverTranslate: false,
  icibaCircleOffsetX: 7,
  icibaCircleOffsetY: 7,
  selectionMaxLengthCut: false,
  selectionMaxLength: 150,
}
