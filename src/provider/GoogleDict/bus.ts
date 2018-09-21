import * as EventEmitter from 'events'

class GoogleDictBus extends EventEmitter {
  public PLAY_AUDIO = 'PLAY_AUDIO'
  public NYM_CLICK = 'NYM_CLICK'
  public ENTRY_CLICK = 'ENTRY_CLICK'
}

const bus = new GoogleDictBus()
bus.setMaxListeners(0)
export default bus
