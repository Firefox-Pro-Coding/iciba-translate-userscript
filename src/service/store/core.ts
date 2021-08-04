import {
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
import { fallback, fallbackInterface } from '~/util/extendIoTs/fallback'
import { ICIBA_CIRCLE_ICON } from '~/constants'
import { providers } from '~/provider'
import { providerType } from '~/util/extendIoTs/provider'

const icibaCircleIcon = enumType<ICIBA_CIRCLE_ICON>(ICIBA_CIRCLE_ICON, 'ICIBA_CIRCLE_ICON')

const providerIds = providers.map((v) => v.id)

const looseProviderArray = new Type<Array<string>>(
  'provider-array',
  (u): u is Array<string> => UnknownArray.is(u),
  (u, c) => {
    if (!UnknownArray.is(u)) {
      return failure(u, c)
    }

    let newArr = (u as Array<string>).filter((v) => providerIds.includes(v))
    newArr = newArr.filter((v, i) => newArr.indexOf(v) === i)
    newArr = newArr.concat(
      providerIds.filter((v) => !newArr.includes(v)),
    )

    return success(newArr)
  },
  identity,
)

export const storeType = fallbackInterface({
  providerOrder: fallback(looseProviderArray, () => [...providerIds]),

  defaultProvider: fallback(providerType, 'ICIBA'),
  icibaCircleRightClick: fallback(boolean, true),
  icibaCircleRightClickProvider: fallback(providerType, 'GOOGLE_TRANSLATE'),
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
