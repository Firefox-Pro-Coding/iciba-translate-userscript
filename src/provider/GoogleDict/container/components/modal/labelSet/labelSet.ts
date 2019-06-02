import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import labels from '../labels/labels.vue'

@Component({
  name: 'GoogleDictContainerLabelSet',
  components: {
    labels,
  },
})
export default class extends Vue {
  @Prop()
  public labelSet: any

  @Prop({ default: 'medium' })
  public size!: string

  @Prop({ default: null })
  public color!: string

  public get isValid() {
    const l = this.labelSet

    return l && Object.keys(l).some(k => l[k].length)
  }
}
