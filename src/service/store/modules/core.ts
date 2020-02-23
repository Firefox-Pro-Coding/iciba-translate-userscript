import {
  type as tType,
  boolean,
  number,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER } from '~/constants/constant'

const provider = enumType<PROVIDER>(PROVIDER, 'PROVIDER')

export const type = tType({
  defaultProvider: fallback(provider, PROVIDER.ICIBA),
  icibaCircleRightClick: fallback(boolean, true),
  icibaCircleRightClickProvider: fallback(provider, PROVIDER.GOOGLE_TRANSLATE),
  pressCtrlToDrag: fallback(boolean, true),
  pressCtrlToShowCircle: fallback(boolean, false),
  mouseOverTranslate: fallback(boolean, false),
  icibaMainInputAutoFocus: fallback(boolean, false),
  icibaMainWidth: fallback(number, 300),
  icibaCircleSize: fallback(number, 22),
  icibaCircleOffsetX: fallback(number, 7),
  icibaCircleOffsetY: fallback(number, 7),
  selectionMaxLengthCut: fallback(boolean, false),
  selectionMaxLength: fallback(number, 150),
  showPin: fallback(boolean, false),
  pinned: fallback(boolean, false),
})

export const defaultData = getFallbackData(type)
