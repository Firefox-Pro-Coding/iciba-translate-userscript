import { EventEmitter } from '~/util/events'

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

class UrbanDictionaryBus {
  private id = 0
  private bus = new EventEmitter()

  public on(e: NAMES.SHOW_TOOLTIP, h: EventHandler<ShowTooltipPayload>): void
  public on(e: NAMES.HIDE_TOOLTIP, h: EventHandler<HideTooltipPayload>): void
  public on(e: NAMES, h: EventHandler<any>) {
    this.bus.on(String(e), h)
  }

  public off(e: NAMES.SHOW_TOOLTIP, h: EventHandler<ShowTooltipPayload>): void
  public off(e: NAMES.HIDE_TOOLTIP, h: EventHandler<HideTooltipPayload>): void
  public off(e: NAMES, h: EventHandler<any>) {
    this.bus.off(String(e), h)
  }

  public emit(e: NAMES.SHOW_TOOLTIP, h: ShowTooltipPayload): void
  public emit(e: NAMES.HIDE_TOOLTIP, h: HideTooltipPayload): void
  public emit(e: NAMES, h: any) {
    this.bus.emit(String(e), h)
  }

  public genId() {
    this.id += 1
    return this.id
  }
}

const urbanDictionaryBus = new UrbanDictionaryBus()
export default urbanDictionaryBus
