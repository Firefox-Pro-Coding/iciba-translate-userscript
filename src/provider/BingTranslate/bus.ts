import { EventEmitter } from 'events'

export const enum NAMES {
  PLAY_AUDIO,
}

interface EventHandler<T> {
  (p: T): void
}

export interface PlayAudioPayload {
  word: string
  /** target language */
  tl: string
}

interface OnOff {
  (e: NAMES.PLAY_AUDIO, h: EventHandler<PlayAudioPayload>): unknown
}

interface Emit {
  (e: NAMES.PLAY_AUDIO, h: PlayAudioPayload): unknown
}

class BingTranslateBus {
  private bus = new EventEmitter()

  public constructor() {
    this.bus.setMaxListeners(0)
  }

  public on: OnOff = (e, h) => {
    this.bus.on(String(e), h)
  }

  public off: OnOff = (e, h) => {
    this.bus.off(String(e), h)
  }

  public emit: Emit = (e, h) => {
    this.bus.emit(String(e), h)
  }
}

const bus = new BingTranslateBus()
export default bus
