/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events'

export const enum EVENTS {
  PLAY_AUDIO,
}

interface OnOff {
  (e: EVENTS.PLAY_AUDIO, l: (a: string) => unknown): unknown
}

interface Emit {
  (e: EVENTS.PLAY_AUDIO, a: string): unknown
}

class GoogleDictBus {
  private bus = new EventEmitter()

  public constructor() {
    this.bus.setMaxListeners(0)
  }

  public on: OnOff = (
    event: EVENTS,
    l: (...p: Array<any>) => unknown,
  ) => this.bus.on(`${event}`, l)

  public off: OnOff = (
    event: EVENTS,
    l: (...p: Array<any>) => unknown,
  ) => this.bus.off(`${event}`, l)

  public emit: Emit = (
    event: EVENTS,
    a: any,
  ) => this.bus.emit(`${event}`, a)
}

const bus = new GoogleDictBus()
export default bus
