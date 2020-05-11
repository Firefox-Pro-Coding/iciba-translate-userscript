/* eslint-disable max-classes-per-file */
import { PROVIDER } from '~/constants/constant'
import { BaiduTranslateParams } from '~/provider/BaiduTranslate/BaiduTranslate'
import { BingTranslateParams } from '~/provider/BingTranslate/BingTranslate'
import { GoogleTranslateParams } from '~/provider/GoogleTranslate/GoogleTranslate'
import { SougouTranslateParams } from '~/provider/SougouTranslate/SougouTranslate'
import { EventEmitter } from '~/util/events'

export const enum EVENTS {
  TRANSLATE,
  HOTKEY_SHOW,
  HOTKEY_TRANSLATE,
  OPEN_SETTING,
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

type Actions = TranslateAction
| OpenSettingAction
| OpenGoogleDictModalAction
| HotKeyShowAction
| HotKeyTranslateAction
| HideCircleTranslateAction

type OnOffPayload = { event: EVENTS.TRANSLATE, listener: (a: TranslateAction) => unknown }
| { event: EVENTS.OPEN_SETTING, listener: (a: OpenSettingAction) => unknown }
| { event: EVENTS.OPEN_GOOGLE_DICT_MODAL, listener: (a: OpenGoogleDictModalAction) => unknown }
| { event: EVENTS.HOTKEY_SHOW, listener: (a: HotKeyShowAction) => unknown }
| { event: EVENTS.HOTKEY_TRANSLATE, listener: (a: HotKeyTranslateAction) => unknown }
| { event: EVENTS.HIDE_CIRCLE, listener: (a: HideCircleTranslateAction) => unknown }

class Bus {
  private bus = new EventEmitter()

  public on(p: OnOffPayload) {
    this.bus.on(`${p.event}`, p.listener)
  }

  public off(p: OnOffPayload) {
    this.bus.off(`${p.event}`, p.listener)
  }

  public emit(action: Actions) {
    return this.bus.emit(`${action.type}`, action)
  }
}

export const bus = new Bus()
