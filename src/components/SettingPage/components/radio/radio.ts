import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import mdi_baseline_radio_button_checked_24px from '~/assets/img/mdi/baseline-radio_button_checked-24px.svg'
import mdi_baseline_radio_button_unchecked_24px from '~/assets/img/mdi/baseline-radio_button_unchecked-24px.svg'

@Component({
  name: 'Radio',
})
export default class Radio extends Vue {
  @Prop({ type: String, default: '' })
  public label!: string

  @Prop()
  public value!: unknown

  @Prop({ type: Boolean, default: false })
  public checked!: boolean

  public icon = {
    checked: mdi_baseline_radio_button_checked_24px,
    unchecked: mdi_baseline_radio_button_unchecked_24px,
  }

  public handleClick() {
    this.$parent.$emit('fuck', this.value)
  }
}
