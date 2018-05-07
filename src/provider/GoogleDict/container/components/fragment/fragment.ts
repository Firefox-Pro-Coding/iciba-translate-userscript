import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus from '~/src/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerFragment',
})
export default class extends Vue {
  @Prop([Array])
  public fragment: any

  public handleEntryLinkClick(word: string) {
    bus.emit('entry-click', word)
  }
}
