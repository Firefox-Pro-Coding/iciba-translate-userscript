import EventEmitter from 'events'

const bus = new EventEmitter()
bus.setMaxListeners(20)

export default bus


export interface IcibaMainTranslatePayload {
  word: string
  event?: MouseEvent
}
