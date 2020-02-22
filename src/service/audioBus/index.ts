/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events'
import { PROVIDER } from '~/constants/constant'
import { BaiduTranslatePlayAudioPayload } from '~/provider/BaiduTranslate/types'
import { BingTranslatePlayAudioPayload } from '~/provider/BingTranslate/types'
import { GoogleDictPlayAudioPayload } from '~/provider/GoogleDict/types'
import { GoogleTranslatePlayAudioPayload } from '~/provider/GoogleTranslate/types'
import { IcibaPlayAudioPayload } from '~/provider/Iciba/types'
import { SougouTranslatePlayAudioPayload } from '~/provider/SougouTranslate/types'
import { VocabularyPlayAudioPayload } from '~/provider/Vocabulary/types'

export const enum EVENTS {
  PLAY_AUDIO,
}

interface PlayAudioActionBase {
  type: EVENTS.PLAY_AUDIO
}

type PlayAudioActionPayload = {
  id: PROVIDER.BAIDU_TRANSLATE
  params: BaiduTranslatePlayAudioPayload
} | {
  id: PROVIDER.BING_TRANSLATE
  params: BingTranslatePlayAudioPayload
} | {
  id: PROVIDER.GOOGLE_DICT
  params: GoogleDictPlayAudioPayload
} | {
  id: PROVIDER.GOOGLE_TRANSLATE
  params: GoogleTranslatePlayAudioPayload
} | {
  id: PROVIDER.ICIBA
  params: IcibaPlayAudioPayload
} | {
  id: PROVIDER.SOUGOU_TRANSLATE
  params: SougouTranslatePlayAudioPayload
} | {
  id: PROVIDER.VOCABULARY
  params: VocabularyPlayAudioPayload
}

export type PlayAudioAction = PlayAudioActionBase & PlayAudioActionPayload

type Actions = PlayAudioAction

interface OnOff {
  (e: EVENTS.PLAY_AUDIO, l: (a: PlayAudioAction) => unknown): unknown
}

class Bus {
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

  public emit(action: Actions) {
    return this.bus.emit(`${action.type}`, action)
  }
}

export const audioBus = new Bus()
