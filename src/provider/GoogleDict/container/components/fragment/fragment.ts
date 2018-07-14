import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import googleDictBus from '~/src/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerFragment',
})
export default class extends Vue {
  @Prop([Array])
  public fragment: any

  public handleEntryLinkClick(word: string) {
    googleDictBus.emit('entry-click', word)
  }
}
