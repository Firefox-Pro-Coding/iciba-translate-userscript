import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerthesaurus',
})
export default class extends Vue {
  @Prop([Array])
  public thesaurusEntries: any
}
