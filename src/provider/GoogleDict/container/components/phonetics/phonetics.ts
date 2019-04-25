import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerPhonetics',
})
export default class extends Vue {
  @Prop([Array])
  public phonetics: unknown

  public handlePlay(url: string): void {
    googleDictBus.emit(googleDictBus.events.PLAY_AUDIO, url)
  }
}
