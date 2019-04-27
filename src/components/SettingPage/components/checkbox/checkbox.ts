import Vue from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'

import mdi_baseline_check_box_24px from '~/assets/img/mdi/baseline-check_box-24px.svg'
import mdi_baseline_check_box_outline_blank_24px from '~/assets/img/mdi/baseline-check_box_outline_blank-24px.svg'

@Component({
  name: 'Checkbox',
})
export default class Checkbox extends Vue {
  @Model('input', { type: Boolean, default: false })
  public value!: boolean

  @Prop({ type: String, default: '' })
  public label!: string

  public icon = {
    checked: mdi_baseline_check_box_24px,
    unchecked: mdi_baseline_check_box_outline_blank_24px,
  }

  public toggle() {
    this.$emit('input', !this.value)
  }
}
