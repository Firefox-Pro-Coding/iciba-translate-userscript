import { EventEmitter } from 'events'

export const enum NAMES {
  SHOW_TOOLTIP,
  HIDE_TOOLTIP,
}

interface EventHandler<T> {
  (p: T): void
}

export interface ShowTooltipPayload {
  top: number
  left: number
  id: number
  text: string
}

export interface HideTooltipPayload {
  id: number
}

interface OnOff {
  (e: NAMES.SHOW_TOOLTIP, h: EventHandler<ShowTooltipPayload>): unknown
  (e: NAMES.HIDE_TOOLTIP, h: EventHandler<HideTooltipPayload>): unknown
}

interface Emit {
  (e: NAMES.SHOW_TOOLTIP, h: ShowTooltipPayload): unknown
  (e: NAMES.HIDE_TOOLTIP, h: HideTooltipPayload): unknown
}

class UrbanDictionaryBus {
  private id = 0
  private bus = new EventEmitter()

  public constructor() {
    this.bus.setMaxListeners(0)
  }

  public on: OnOff = (e: NAMES, h: EventHandler<any>) => {
    this.bus.on(String(e), h)
  }

  public off: OnOff = (e: NAMES, h: EventHandler<any>) => {
    this.bus.off(String(e), h)
  }

  public emit: Emit = (e: NAMES, h: any) => {
    this.bus.emit(String(e), h)
  }

  public genId() {
    this.id += 1
    return this.id
  }
}

const urbanDictionaryBus = new UrbanDictionaryBus()
export default urbanDictionaryBus
