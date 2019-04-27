import Vue from 'vue'
import { Component, Model } from 'vue-property-decorator'

@Component({
  name: 'RadioGroup',
})
export default class RadioGroup extends Vue {
  @Model('input')
  public value!: unknown

  public mounted() {
    this.$on('fuck', this.handleRadioClick)
  }

  public render() {
    const defaultSlot = this.$slots.default ? this.$slots.default : []
    return (
      <div class='radio-group flex-co align-start'>
        { defaultSlot.map((v) => {
          if (v.componentOptions && v.componentOptions.propsData) {
            const props = v.componentOptions.propsData as any
            props.checked = props.value === this.value
          }
          return v
        }) }
      </div>
    )
  }

  public handleRadioClick(value: unknown) {
    this.$emit('input', value)
  }
}
