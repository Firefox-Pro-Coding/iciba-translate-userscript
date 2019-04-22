import Vue from 'vue'
import { Component, Model } from 'vue-property-decorator'

@Component({
  name: 'RadioGroup',
})
export default class RadioGroup extends Vue {
  @Model('input')
  public value!: any

  public mounted() {
    this.$on('fuck', this.handleRadioClick)
  }

  public render() {
    const defaultSlot = this.$slots.default ? this.$slots.default : []
    return (
      <div class='radio-group q-flex-co align-start'>
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

  public handleRadioClick(value: any) {
    this.$emit('input', value)
  }
}
