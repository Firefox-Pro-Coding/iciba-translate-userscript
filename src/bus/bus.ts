import * as EventEmitter from 'events'
import { PROVIDER } from '~/constants/constant'

enum NAMES {
  ICIBA_CIRCLE_CLICK_TRANSLATE = 'ICIBA_CIRCLE_CLICK_TRANSLATE',
  ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE = 'ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE',

  TRANSLATE = 'TRANSLATE',

  SETTING_OPEN = 'SETTING_OPEN',
  SETTING_PREPARE_OPEN = 'SETTING_PREPARE_OPEN',

  GOOGLE_DICT_MODAL_PREPARE_OPEN = 'GOOGLE_DICT_MODAL_PREPARE_OPEN',
  GOOGLE_DICT_MODAL_OPEN = 'GOOGLE_DICT_MODAL_OPEN',
  GOOGLE_DICT_WORD_CLICK = 'GOOGLE_DICT_WORD_CLICK',

  URBAN_DICTIONAR_TOOLTIP_CLICK = 'URBAN_DICTIONAR_TOOLTIP_CLICK',
}

interface EventHandler<T> {
  (p: T): void
}

interface GoogleDictData {
  googleDictData: any
}

interface TranslatePayloadCommon {
  word: string
}

export interface GoogleTranslatePayload extends TranslatePayloadCommon {
  uniqName: PROVIDER.GOOGLE_TRANSLATE
  sl: string
  tl: string
}

export interface BaiduTranslatePayload extends TranslatePayloadCommon {
  uniqName: PROVIDER.BAIDU_TRANSLATE
  sl: string
  tl: string
}

export interface SougouTranslatePayload extends TranslatePayloadCommon {
  uniqName: PROVIDER.SOUGOU_TRANSLATE
  sl: string
  tl: string
}

export interface BingTranslatePayload extends TranslatePayloadCommon {
  uniqName: PROVIDER.BING_TRANSLATE
  sl: string
  tl: string
}

export type TranslatePayload = GoogleTranslatePayload
| BaiduTranslatePayload
| SougouTranslatePayload
| BingTranslatePayload

export interface ClickTranslatePayload {
  word: string
  event: MouseEvent
}

// tslint:disable:unified-signatures
class Bus extends EventEmitter {
  public events = NAMES
  public on(e: NAMES.ICIBA_CIRCLE_CLICK_TRANSLATE, h: EventHandler<ClickTranslatePayload>): this
  public on(e: NAMES.ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE, h: EventHandler<ClickTranslatePayload>): this
  public on(e: NAMES.SETTING_OPEN, h: EventHandler<void>): this
  public on(e: NAMES.SETTING_PREPARE_OPEN, h: EventHandler<void>): this
  public on(e: NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, h: EventHandler<GoogleDictData>): this
  public on(e: NAMES.GOOGLE_DICT_MODAL_OPEN, h: EventHandler<GoogleDictData>): this
  public on(e: NAMES.GOOGLE_DICT_WORD_CLICK, h: EventHandler<ClickTranslatePayload>): this
  public on(e: NAMES.TRANSLATE, h: EventHandler<TranslatePayload>): this
  public on(e: NAMES.URBAN_DICTIONAR_TOOLTIP_CLICK, h: EventHandler<string>): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }

  public emit(e: NAMES.ICIBA_CIRCLE_CLICK_TRANSLATE, p: ClickTranslatePayload): boolean
  public emit(e: NAMES.ICIBA_CIRCLE_CLICK_TRANSLATE_PREPARE, p: ClickTranslatePayload): boolean
  public emit(e: NAMES.SETTING_OPEN): boolean
  public emit(e: NAMES.SETTING_PREPARE_OPEN): boolean
  public emit(e: NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, p: GoogleDictData): boolean
  public emit(e: NAMES.GOOGLE_DICT_MODAL_OPEN, p: GoogleDictData): boolean
  public emit(e: NAMES.GOOGLE_DICT_WORD_CLICK, p: ClickTranslatePayload): boolean
  public emit(e: NAMES.TRANSLATE, p: TranslatePayload): boolean
  public emit(e: NAMES.URBAN_DICTIONAR_TOOLTIP_CLICK, p: string): boolean
  public emit(event: string, payload?: unknown) {
    return super.emit(event, payload)
  }
}

const bus = new Bus()
bus.setMaxListeners(20)

export default bus
