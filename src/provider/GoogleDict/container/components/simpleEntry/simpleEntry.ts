import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import phonetics from '../phonetics/phonetics.vue'
import fragment from '../fragment/fragment.vue'
import simpleSubEntry from '../simpleSubEntry/simpleSubEntry.vue'

@Component({
  name: 'GoogleDictContainerSimpleEntry',
  components: {
    phonetics,
    fragment,
    simpleSubEntry,
  },
})
export default class extends Vue {
  @Prop([Object])
  public entry!: unknown
}
