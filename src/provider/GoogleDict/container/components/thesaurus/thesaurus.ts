import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Labels from '../labels/labels.vue'

import googleDictBus from '~/provider/GoogleDict/bus'

@Component({
  name: 'GoogleDictContainerthesaurus',
  components: {
    Labels,
  },
})
export default class extends Vue {
  @Prop([Array])
  public thesaurusEntries: any

  public addQoute(text: string): string {
    return `"${text}"`
  }

  public handleNymClick(word: string) {
    googleDictBus.emit(googleDictBus.NYM_CLICK, word)
  }
}
