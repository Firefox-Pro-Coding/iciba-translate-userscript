import EventEmitter from 'events'

enum NAMES {
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
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

class UrbanDictionaryBus extends EventEmitter {
  public events = NAMES
  private id = 0

  public on(e: NAMES.SHOW_TOOLTIP, h: EventHandler<ShowTooltipPayload>): this
  public on(e: NAMES.HIDE_TOOLTIP, h: EventHandler<HideTooltipPayload>): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }

  public emit(e: NAMES.SHOW_TOOLTIP, p: ShowTooltipPayload): boolean
  public emit(e: NAMES.HIDE_TOOLTIP, p: HideTooltipPayload): boolean
  public emit(event: string, payload?: unknown) {
    return super.emit(event, payload)
  }

  public genId() {
    this.id += 1
    return this.id
  }
}

const bus = new UrbanDictionaryBus()
bus.setMaxListeners(0)
export default bus
