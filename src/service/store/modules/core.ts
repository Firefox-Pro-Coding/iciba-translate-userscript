import {
  type as tType,
  boolean,
  number,
  Type,
  UnknownArray,
  success,
  failure,
  identity,
  array,
  string,
} from 'io-ts'
import { enumType } from '~/util/extendIoTs/enum'
import { fallback, getFallbackData } from '~/util/extendIoTs/fallback'
import { PROVIDER, allProviders, ICIBA_CIRCLE_ICON } from '~/constants'

const provider = enumType<PROVIDER>(PROVIDER, 'PROVIDER')
const icibaCircleIcon = enumType<ICIBA_CIRCLE_ICON>(ICIBA_CIRCLE_ICON, 'ICIBA_CIRCLE_ICON')

const looseProviderArray = new Type<Array<PROVIDER>>(
  'provider-array',
  (u): u is Array<PROVIDER> => UnknownArray.is(u),
  (u, c) => {
    if (!UnknownArray.is(u)) {
      return failure(u, c)
    }

    let newArr = (u as Array<PROVIDER>).filter((v) => allProviders.includes(v))
    newArr = newArr.filter((v, i) => newArr.indexOf(v) === i)
    newArr = newArr.concat(
      allProviders.filter((v) => !newArr.includes(v)),
    )

    return success(newArr)
  },
  identity,
)

export const type = tType({
  providerOrder: fallback(looseProviderArray, () => [...allProviders]),

  defaultProvider: fallback(provider, PROVIDER.ICIBA),
  icibaCircleRightClick: fallback(boolean, true),
  icibaCircleRightClickProvider: fallback(provider, PROVIDER.GOOGLE_TRANSLATE),
  icibaCircleNoCJK: fallback(boolean, false),

  useIcibaCircle: fallback(boolean, true),
  icibaCircleIcon: fallback(icibaCircleIcon, ICIBA_CIRCLE_ICON.DEFAULT),
  pressCtrlToDrag: fallback(boolean, true),
  pressCtrlToShowCircle: fallback(boolean, false),
  mouseOverTranslate: fallback(boolean, false),
  icibaMainInputAutoFocus: fallback(boolean, false),

  history: fallback(boolean, false),

  showPin: fallback(boolean, false),
  pinned: fallback(boolean, false),

  selectionMaxLengthCut: fallback(boolean, false),
  selectionMaxLength: fallback(number, 150),

  icibaMainWidth: fallback(number, 300),
  icibaCircleSize: fallback(number, 22),
  icibaCircleOffsetX: fallback(number, 7),
  icibaCircleOffsetY: fallback(number, 7),

  providerHotkeyAutoFocus: fallback(boolean, false),
  useHotkeyShowUp: fallback(boolean, false),
  hotkeyIcibaMainInputAutoFocus: fallback(boolean, true),
  showUpHotkey: fallback(array(string), () => []),
})

export const defaultData = getFallbackData(type)
