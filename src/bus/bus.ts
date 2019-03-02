import * as EventEmitter from 'events'

enum NAMES {
  ICIBA_MAIN_TRANSLATE = 'iciba-main:translate',
  ICIBA_MAIN_PREPARE_TRANSLATE = 'iciba-main:prepare-translate',

  SETTING_OPEN = 'setting:open',
  SETTING_PREPARE_OPEN = 'setting:prepare-open',

  GOOGLE_DICT_MODAL_PREPARE_OPEN = 'google-dict:modal-prepare-open',
  GOOGLE_DICT_MODAL_OPEN = 'google-dict:modal-open',

  SETTING_STORE_UPDATE = 'setting-store:update',
}
interface EventHandler<T> {
  (p: T): void
}
type OnParameterOverride = [NAMES.ICIBA_MAIN_TRANSLATE, EventHandler<IcibaCircleClickTranslatePayload>]
| [NAMES.ICIBA_MAIN_PREPARE_TRANSLATE, EventHandler<IcibaCircleClickTranslatePayload>]
| [NAMES.SETTING_OPEN, EventHandler<void>]
| [NAMES.SETTING_PREPARE_OPEN, EventHandler<void>]
| [NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, EventHandler<void>]
| [NAMES.GOOGLE_DICT_MODAL_OPEN, EventHandler<void>]
| [NAMES.SETTING_STORE_UPDATE, EventHandler<void>]

class Bus extends EventEmitter {
  public events = NAMES
  public on(...p: OnParameterOverride): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }
}

const bus = new Bus()
bus.setMaxListeners(20)

export default bus

export interface IcibaCircleClickTranslatePayload {
  word: string
  event: MouseEvent
}
