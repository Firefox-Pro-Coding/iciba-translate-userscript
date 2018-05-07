import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import bus from '~/src/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerthesaurus',
})
export default class extends Vue {
  @Prop([Array])
  public thesaurusEntries: any

  public addQoute(text: string): string {
    return `"${text}"`
  }

  public handleNymClick(word: string) {
    bus.emit('nym-click', word)
  }
}
