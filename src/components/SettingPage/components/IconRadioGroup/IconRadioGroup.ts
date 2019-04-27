import Vue from 'vue'
import { Component, Prop, Model } from 'vue-property-decorator'
import checked_291201 from '~/assets/img/checked_291201.svg'

@Component({
  name: 'IconRadioGroup',
})
export default class IconRadioGroup extends Vue {
  @Model('input', { type: String, default: '' })
  public value!: string

  @Prop({ type: Array, default: [] })
  public icons!: Array<{ icon: string, key: string }>

  public checkIcon = checked_291201

  public handleSelect(key: string) {
    this.$emit('input', key)
  }
}
