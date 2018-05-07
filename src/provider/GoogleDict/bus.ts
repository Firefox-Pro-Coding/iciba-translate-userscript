import * as EventEmitter from 'events'

const bus = new EventEmitter()
bus.setMaxListeners(0)
export default bus
