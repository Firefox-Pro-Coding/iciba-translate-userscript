import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import globalBus from '~/bus/bus'

import Labels from '../labels/labels.vue'
import Foldable from '../foldable/foldable.vue'

interface NymItem {
  numEntries: 1 | 0
  nym: string
}

interface ThesaurusItem {
  nyms: Array<NymItem>
}

interface ThesaurusEntry {
  synonyms: Array<ThesaurusItem>
  antonyms: Array<ThesaurusItem>
  examples: Array<string>
  headword: string
}

@Component({
  name: 'GoogleDictContainerThesaurus',
  components: {
    Labels,
    Foldable,
  },
})
export default class extends Vue {
  @Prop({ type: Array, default: () => [] })
  public thesaurusEntries!: ThesaurusEntry

  protected addQoute(text: string): string {
    return `"${text}"`
  }

  protected handleNymClick(event: MouseEvent, word: string) {
    globalBus.emit(globalBus.events.GOOGLE_DICT_WORD_CLICK, { event, word })
  }
}
