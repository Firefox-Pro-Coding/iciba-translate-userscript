import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

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

  public handleClick() {
    this.$parent.$emit('fuck', this.value)
  }
}
