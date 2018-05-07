import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import bus from '~/src/provider/GoogleDict/bus'

import labelSet from '../labelSet/labelSet.vue'
import thesaurus from '../thesaurus/thesaurus.vue'
import phonetics from '../phonetics/phonetics.vue'
import fragment from '../fragment/fragment.vue'
import etymology from '../etymology/etymology.vue'
import exampleGroups from '../exampleGroups/exampleGroups.vue'

@Component({
  name: 'GoogleDictContainerEntry',
  components: {
    labelSet,
    thesaurus,
    phonetics,
    fragment,
    etymology,
    exampleGroups,
  },
})
export default class extends Vue {
  @Prop([Object])
  public entry!: any

  public handleEntryLinkClick(word: string) {
    bus.emit('entry-click', word)
  }
}
