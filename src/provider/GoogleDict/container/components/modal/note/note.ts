import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import labels from '../labels/labels.vue'

@Component({
  name: 'GoogleDictContainerNote',
  components: {
    labels,
  },
})
export default class extends Vue {
  @Prop([Object])
  public note!: unknown
}
