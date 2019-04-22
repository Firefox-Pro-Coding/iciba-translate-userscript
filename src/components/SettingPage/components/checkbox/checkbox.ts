import Vue from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'

@Component({
  name: 'Checkbox',
})
export default class Checkbox extends Vue {
  @Model('input', { type: Boolean, default: false })
  public value!: boolean

  @Prop({ type: String, default: '' })
  public label!: string

  public toggle() {
    this.$emit('input', !this.value)
  }
}
