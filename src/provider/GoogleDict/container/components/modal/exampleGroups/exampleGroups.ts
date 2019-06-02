import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import labels from '../labels/labels.vue'
import foldable from '../foldable/foldable.vue'

@Component({
  name: 'GoogleDictContainerExampleGroups',
  components: {
    labels,
    foldable,
  },
})
export default class extends Vue {
  @Prop([Array])
  public exampleGroups!: unknown
}
