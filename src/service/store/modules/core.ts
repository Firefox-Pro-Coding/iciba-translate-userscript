import {
  type as tType,
  TypeOf,
  boolean,
  number,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'

import { PROVIDER } from '~/constants/constant'

export const type = tType({
  defaultProvider: enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  icibaCircleRightClick: boolean,
  icibaCircleRightClickProvider: enumType<PROVIDER>(PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: boolean,
  pressCtrlToShowCircle: boolean,
  mouseOverTranslate: boolean,
  icibaMainInputAutoFocus: boolean,
  icibaMainWidth: number,
  icibaCircleSize: number,
  icibaCircleOffsetX: number,
  icibaCircleOffsetY: number,
  selectionMaxLengthCut: boolean,
  selectionMaxLength: number,
  showPin: boolean,
  pinned: boolean,
})

export const defaultData: TypeOf<typeof type> = {
  defaultProvider: PROVIDER.ICIBA,
  icibaCircleRightClick: true,
  icibaCircleRightClickProvider: PROVIDER.GOOGLE_TRANSLATE,
  pressCtrlToDrag: true,
  pressCtrlToShowCircle: false,
  mouseOverTranslate: false,
  icibaMainInputAutoFocus: false,
  icibaMainWidth: 300,
  icibaCircleSize: 22,
  icibaCircleOffsetX: 7,
  icibaCircleOffsetY: 7,
  selectionMaxLengthCut: false,
  selectionMaxLength: 150,
  showPin: false,
  pinned: false,
}
