import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus from '~/src/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerPhonetics',
})
export default class extends Vue {
  @Prop([Array])
  public phonetics: any

  public handlePlay(url: string): void {
    bus.emit('play-audio', url)
  }
}
