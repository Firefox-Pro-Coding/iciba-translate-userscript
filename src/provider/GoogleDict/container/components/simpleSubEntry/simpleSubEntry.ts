import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import phonetics from '../phonetics/phonetics.vue'
import fragment from '../fragment/fragment.vue'

@Component({
  name: 'GoogleDictContainerSimpleSubEntry',
  components: {
    phonetics,
    fragment,
  },
})
export default class extends Vue {
  @Prop([Object])
  public entry!: unknown
}
