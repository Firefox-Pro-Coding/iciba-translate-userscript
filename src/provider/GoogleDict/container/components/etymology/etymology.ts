import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import fragment from '../fragment/fragment.vue'

@Component({
  name: 'GoogleDictContainerEtymology',
  components: {
    fragment,
  },
})
export default class extends Vue {
  @Prop()
  public etymology: any

  public handleEntryLinkClick(word: string) {
    this.$emit('entry-click', word)
  }
}
