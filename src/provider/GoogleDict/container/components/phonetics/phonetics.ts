import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

@Component({
  name: 'GoogleDictContainerPhonetics',
})
export default class extends Vue {
  @Prop([Array])
  public phonetics: unknown

  public icon = {
    play_speaker_filled_audio_tool_59284,
  }

  public handlePlay(url: string): void {
    googleDictBus.emit(googleDictBus.events.PLAY_AUDIO, url)
  }
}
