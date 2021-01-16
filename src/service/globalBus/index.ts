/* eslint-disable max-classes-per-file */
import { EventEmitter } from '~/util/events'

import type {
  Actions,
  OnOffPayload,
} from './types'

export * from './types'

class Bus {
  private bus = new EventEmitter()

  public on<T extends Actions>(p: OnOffPayload<T>) {
    this.bus.on(`${p.event}`, p.listener)
  }

  public off<T extends Actions>(p: OnOffPayload<T>) {
    this.bus.off(`${p.event}`, p.listener)
  }

  public emit(action: Actions) {
    this.bus.emit(`${action.type}`, action)
  }
}

export const bus = new Bus()
