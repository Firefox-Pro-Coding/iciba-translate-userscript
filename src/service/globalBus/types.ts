import { PROVIDER } from '~/constants'
import { BaiduTranslateParams } from '~/provider/BaiduTranslate/BaiduTranslate'
import { BingTranslateParams } from '~/provider/BingTranslate/BingTranslate'
import { GoogleTranslateParams } from '~/provider/GoogleTranslate/GoogleTranslate'
import { SougouTranslateParams } from '~/provider/SougouTranslate/SougouTranslate'

export const enum EVENTS {
  TRANSLATE,
  HOTKEY_SHOW,
  HOTKEY_TRANSLATE,
  OPEN_SETTING,
  OPEN_HISTORY,
  OPEN_GOOGLE_DICT_MODAL,
  HIDE_CIRCLE,
}

export interface TranslateAction {
  type: EVENTS.TRANSLATE
  word: string
  mouseEvent?: MouseEvent
  param?: {
    provider: PROVIDER.BAIDU_TRANSLATE
    param?: BaiduTranslateParams
  } | {
    provider: PROVIDER.BING_TRANSLATE
    param?: BingTranslateParams
  } | {
    provider: PROVIDER.GOOGLE_TRANSLATE
    param?: GoogleTranslateParams
  } | {
    provider: PROVIDER.GOOGLE_DICT
    param?: undefined
  } | {
    provider: PROVIDER.ICIBA
    param?: undefined
  } | {
    provider: PROVIDER.SOUGOU_TRANSLATE
    param?: SougouTranslateParams
  } | {
    provider: PROVIDER.URBAN_DICTIONARY
    param?: undefined
  } | {
    provider: PROVIDER.VOCABULARY
    param?: undefined
  }
}

export interface OpenSettingAction {
  type: EVENTS.OPEN_SETTING
}

export interface OpenHistoryAction {
  type: EVENTS.OPEN_HISTORY
}

export interface OpenGoogleDictModalAction {
  type: EVENTS.OPEN_GOOGLE_DICT_MODAL
  googleDictData: any
}

export interface HotKeyShowAction {
  type: EVENTS.HOTKEY_SHOW
  mouseEvent: MouseEvent
}

export interface HotKeyTranslateAction {
  type: EVENTS.HOTKEY_TRANSLATE
  mouseEvent: MouseEvent
  word: string
  provider: PROVIDER
}

export interface HideCircleTranslateAction {
  type: EVENTS.HIDE_CIRCLE
}

export type Actions = TranslateAction
| OpenSettingAction
| OpenHistoryAction
| OpenGoogleDictModalAction
| HotKeyShowAction
| HotKeyTranslateAction
| HideCircleTranslateAction

export interface OnOffPayload<T extends Actions> {
  event: T['type']
  listener: (action: T) => unknown
}
