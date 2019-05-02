import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'IIcon',
})
export default class IIcon extends Vue {
  @Prop({ type: String, default: '' })
  public svg!: string

  @Prop({ type: [Number, String], default: 16 })
  public size!: number | string

  @Prop({ type: String, default: '' })
  public color!: string

  public get computedSize() {
    const size = parseInt(`${this.size}`, 10)
    if (`${size}` === `${this.size}`) {
      return `${size}px`
    }
    return this.size
  }

  public get svgContent() {
    return this.color
      ? this.svg.replace(/(fill="#[a-fA-F0-9]{6}")/g, `fill="${this.color}"`)
      : this.svg
  }
}
