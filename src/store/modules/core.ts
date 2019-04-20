import * as t from 'io-ts'

import { PROVIDER } from '~/constants/constant'

export const type = t.type({
  defaultProvider: t.enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  icibaCircleRightClick: t.boolean,
  icibaCircleRightClickProvider: t.enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: t.boolean,
  pressCtrlToShowCircle: t.boolean,
  mouseOverTranslate: t.boolean,
  icibaCircleOffsetX: t.number,
  icibaCircleOffsetY: t.number,
  selectionMaxLengthCut: t.boolean,
  selectionMaxLength: t.number,
  showPin: t.boolean,
  pinned: t.boolean,
})

export const defaultData: t.TypeOf<typeof type> = {
  defaultProvider: PROVIDER.ICIBA,
  icibaCircleRightClick: true,
  icibaCircleRightClickProvider: PROVIDER.GOOGLE_TRANSLATE,
  pressCtrlToDrag: true,
  pressCtrlToShowCircle: false,
  mouseOverTranslate: false,
  icibaCircleOffsetX: 7,
  icibaCircleOffsetY: 7,
  selectionMaxLengthCut: false,
  selectionMaxLength: 150,
  showPin: false,
  pinned: false,
}
