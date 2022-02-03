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
    provider: string
    param?: any
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
  word: string
}

export interface HotKeyTranslateAction {
  type: EVENTS.HOTKEY_TRANSLATE
  mouseEvent: MouseEvent
  word: string
  provider: string
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
