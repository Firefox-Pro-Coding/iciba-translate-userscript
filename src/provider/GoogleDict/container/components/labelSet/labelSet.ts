import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerLabelSet',
})
export default class extends Vue {
  @Prop()
  public labelSet: any

  public get isValid() {
    const l = this.labelSet

    return l && Object.keys(l).some(k => l[k].length)
  }
}
