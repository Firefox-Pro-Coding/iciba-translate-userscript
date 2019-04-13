import Vue from 'vue'
import { Component, Prop, Model } from 'vue-property-decorator'

@Component({
  name: 'IconRadioGroup',
})
export default class IconRadioGroup extends Vue {
  @Model('input', { type: String, default: '' })
  public value!: string

  @Prop({ type: Array, default: [] })
  public icons!: Array<{ icon: string, key: string }>

  public handleSelect(key: string) {
    this.$emit('input', key)
  }
}
