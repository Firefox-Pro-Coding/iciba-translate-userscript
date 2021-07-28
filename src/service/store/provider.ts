import { array, boolean, string } from 'io-ts'
import { fallback } from '~/util/extendIoTs/fallback'

export const providerCommonStore = {
  enableHotkey: fallback(boolean, false),
  hotkey: fallback(array(string), () => []),
}
