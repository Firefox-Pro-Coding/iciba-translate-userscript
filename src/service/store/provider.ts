import { array, boolean, string } from 'io-ts'
import { fallback } from '~/util/extendIoTs/fallback'

const providerHotkeyType = {
  enableHotkey: fallback(boolean, false),
  hotkey: fallback(array(string), () => []),
}

export const providerCommonStore = {
  ...providerHotkeyType,
  display: fallback(boolean, false),
}
