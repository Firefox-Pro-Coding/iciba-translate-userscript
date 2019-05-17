import * as t from 'io-ts'
import { enumType } from '~/util/extendIoTs'

import { PROVIDER } from '~/constants/constant'

export const type = t.type({
  defaultProvider: enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  icibaCircleRightClick: t.boolean,
  icibaCircleRightClickProvider: enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: t.boolean,
  pressCtrlToShowCircle: t.boolean,
  mouseOverTranslate: t.boolean,
  icibaMainWidth: t.number,
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
  icibaMainWidth: 300,
  icibaCircleOffsetX: 7,
  icibaCircleOffsetY: 7,
  selectionMaxLengthCut: false,
  selectionMaxLength: 150,
  showPin: false,
  pinned: false,
}
