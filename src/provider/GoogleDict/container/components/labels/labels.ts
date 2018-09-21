import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerLabels',
})
export default class extends Vue {
  @Prop([Array])
  public labels!: Array<string>

  @Prop({ default: 'default' })
  public type!: string

  @Prop({ default: 'plain' })
  public color!: string

  @Prop({ default: 'medium' })
  public size!: string

  public popoverVisibleMap: { [k: string]: boolean } = {}

  /** 显示 popover */
  public handleShowPopover(label: string) {
    this.$set(this.popoverVisibleMap, label, true)
  }

  /** 隐藏 popover */
  public handleHidePopover(label: string) {
    this.$set(this.popoverVisibleMap, label, false)
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
