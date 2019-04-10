import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'ToastComponent',
})
export default class ToastComponent extends Vue {
  @Prop({ type: String, default: '' })
  public text!: string

  @Prop({ type: Number, default: 3000 })
  public timeout!: number

  public visible = false

  public mounted() {
    this.visible = true
    setTimeout(() => {
      this.visible = false
      setTimeout(() => {
        this.$destroy()
      }, 3000)
    }, this.timeout)
  }
}
