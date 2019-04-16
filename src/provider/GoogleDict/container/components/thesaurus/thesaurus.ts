import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

import Labels from '../labels/labels.vue'
import Foldable from '../foldable/foldable.vue'

@Component({
  name: 'GoogleDictContainerthesaurus',
  components: {
    Labels,
    Foldable,
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
