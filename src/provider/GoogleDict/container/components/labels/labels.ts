import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerLabels',
})
export default class extends Vue {
  public popoverVisible = false
  @Prop([Array])
  public labels!: Array<string>

  @Prop({ default: 'default' })
  public type!: string

  @Prop({ default: 'plain' })
  public color!: string

  @Prop({ default: 'medium' })
  public size!: string

  public handleShowPopover() {
    this.popoverVisible = true
  }

  public handleHidePopover() {
    this.popoverVisible = false
  }

  public get labelClass() {
    return `${this.type}-label`
  }

  public get colorClass() {
    return `iciba-label-color-${this.color}`
  }

  public get sizeClass() {
    return `iciba-label-size-${this.size}`
  }
}
