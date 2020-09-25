/* eslint-disable max-classes-per-file */
import { PROVIDER } from '~/constants'
import { BaiduTranslatePlayAudioPayload } from '~/provider/BaiduTranslate/types'
import { BingTranslatePlayAudioPayload } from '~/provider/BingTranslate/types'
import { GoogleDictPlayAudioPayload } from '~/provider/GoogleDict/types'
import { GoogleTranslatePlayAudioPayload } from '~/provider/GoogleTranslate/types'
import { IcibaPlayAudioPayload } from '~/provider/Iciba/types'
import { SougouTranslatePlayAudioPayload } from '~/provider/SougouTranslate/types'
import { VocabularyPlayAudioPayload } from '~/provider/Vocabulary/types'
import { EventEmitter } from '~/util/events'

export const enum AEVENTS {
  PLAY_AUDIO,
}

interface PlayAudioActionBase {
  type: AEVENTS.PLAY_AUDIO
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

class Bus {
  private bus = new EventEmitter()

  public on(e: AEVENTS.PLAY_AUDIO, l: (a: PlayAudioAction) => unknown): unknown
  public on(event: AEVENTS, l: (...p: Array<any>) => unknown) {
    this.bus.on(`${event}`, l)
  }

  public off(e: AEVENTS.PLAY_AUDIO, l: (a: PlayAudioAction) => unknown): unknown
  public off(event: AEVENTS, l: (...p: Array<any>) => unknown) {
    this.bus.off(`${event}`, l)
  }

  public emit(action: Actions) {
    this.bus.emit(`${action.type}`, action)
  }
}

export const audioBus = new Bus()
