import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerFragment',
})
export default class extends Vue {
  @Prop([Array])
  public fragment: any

  public handleEntryLinkClick(event: MouseEvent, word: string) {
    googleDictBus.emit(googleDictBus.events.ENTRY_CLICK, { word, event })
  }
}
