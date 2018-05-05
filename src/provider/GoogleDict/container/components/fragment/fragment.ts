import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerFragment',
})
export default class extends Vue {
  @Prop([Array])
  public fragment: any

  public handleEntryLinkClick(word: string) {
    this.$emit('entry-click', word)
  }
}
