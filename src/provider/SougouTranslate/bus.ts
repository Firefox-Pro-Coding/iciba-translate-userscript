import * as EventEmitter from 'events'

enum NAMES {
  PLAY_AUDIO = 'PLAY_AUDIO',
}

interface EventHandler<T> {
  (p: T): void
}

export interface PlayAudioPayload {
  word: string
  /** target language */
  tl: string
}


// tslint:disable:unified-signatures
class SougouTranslateBus extends EventEmitter {
  public events = NAMES

  public on(e: NAMES.PLAY_AUDIO, h: EventHandler<PlayAudioPayload>): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }

  public emit(e: NAMES.PLAY_AUDIO, p: PlayAudioPayload): boolean
  public emit(event: string, payload: unknown) {
    return super.emit(event, payload)
  }
}

const bus = new SougouTranslateBus()
bus.setMaxListeners(0)
export default bus
