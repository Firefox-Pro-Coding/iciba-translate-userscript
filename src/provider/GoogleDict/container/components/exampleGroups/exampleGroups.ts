import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import labels from '../labels/labels.vue'

@Component({
  name: 'GoogleDictContainerExampleGroups',
  components: {
    labels,
  },
})
export default class extends Vue {
  @Prop([Array])
  public exampleGroups!: any
}
