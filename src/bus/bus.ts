import * as EventEmitter from 'events'

enum NAMES {
  ICIBA_MAIN_TRANSLATE = 'ICIBA_MAIN_TRANSLATE',
  ICIBA_MAIN_PREPARE_TRANSLATE = 'ICIBA_MAIN_PREPARE_TRANSLATE',

  SETTING_OPEN = 'SETTING_OPEN',
  SETTING_PREPARE_OPEN = 'SETTING_PREPARE_OPEN',

  GOOGLE_DICT_MODAL_PREPARE_OPEN = 'GOOGLE_DICT_MODAL_PREPARE_OPEN',
  GOOGLE_DICT_MODAL_OPEN = 'GOOGLE_DICT_MODAL_OPEN',
  GOOGLE_DICT_WORD_CLICK = 'GOOGLE_DICT_WORD_CLICK',
}

interface EventHandler<T> {
  (p: T): void
}

interface GoogleDictData {
  googleDictData: any
}

export interface ClickTranslatePayload {
  word: string
  event: MouseEvent
}

// tslint:disable:unified-signatures
class Bus extends EventEmitter {
  public events = NAMES
  public on(e: NAMES.ICIBA_MAIN_TRANSLATE, h: EventHandler<ClickTranslatePayload>): this
  public on(e: NAMES.ICIBA_MAIN_PREPARE_TRANSLATE, h: EventHandler<ClickTranslatePayload>): this
  public on(e: NAMES.SETTING_OPEN, h: EventHandler<void>): this
  public on(e: NAMES.SETTING_PREPARE_OPEN, h: EventHandler<void>): this
  public on(e: NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, h: EventHandler<GoogleDictData>): this
  public on(e: NAMES.GOOGLE_DICT_MODAL_OPEN, h: EventHandler<GoogleDictData>): this
  public on(e: NAMES.GOOGLE_DICT_WORD_CLICK, h: EventHandler<ClickTranslatePayload>): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }

  public emit(e: NAMES.ICIBA_MAIN_TRANSLATE, p: ClickTranslatePayload): boolean
  public emit(e: NAMES.ICIBA_MAIN_PREPARE_TRANSLATE, p: ClickTranslatePayload): boolean
  public emit(e: NAMES.SETTING_OPEN): boolean
  public emit(e: NAMES.SETTING_PREPARE_OPEN): boolean
  public emit(e: NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, p: GoogleDictData): boolean
  public emit(e: NAMES.GOOGLE_DICT_MODAL_OPEN, p: GoogleDictData): boolean
  public emit(e: NAMES.GOOGLE_DICT_WORD_CLICK, p: ClickTranslatePayload): boolean
  public emit(event: string, payload?: any) {
    return super.emit(event, payload)
  }
}

const bus = new Bus()
bus.setMaxListeners(20)

export default bus
