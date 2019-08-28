import Vue from 'vue'
import { Component, Prop, Model, Watch } from 'vue-property-decorator'

@Component({
  name: 'Slider',
})
export default class Slider extends Vue {
  public $refs!: {
    track: HTMLDivElement
    notch: HTMLDivElement
  }

  @Model('input', { type: Number })
  public value!: number

  @Prop({ type: Number, default: 0 })
  public min!: number

  @Prop({ type: Number, default: 100 })
  public max!: number

  @Prop({ type: Number, default: 1 })
  public step!: number

  public drag = {
    startX: 0,
    dragging: false,
    afterDragging: false,
  }

  public cachedValue = 0

  public mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    this.cachedValue = this.value
  }

  public destroyed() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  protected handleMouseDown(e: MouseEvent) {
    this.drag.dragging = true
    this.drag.afterDragging = true
    this.drag.startX = e.clientX
  }

  protected handleMouseMove(e: MouseEvent) {
    if (!this.drag.dragging) {
      return
    }
    const deltaX = e.clientX - this.drag.startX
    const width = this.$refs.track.getBoundingClientRect().width
    const deltaPercentage = deltaX / width
    this.cachedValue = this.getValueFromDeltaPercentage(deltaPercentage)
  }

  protected handleMouseUp() {
    this.drag.dragging = false
    setTimeout(() => {
      this.drag.afterDragging = false
    })
    this.$emit('input', this.cachedValue)
  }

  protected handleTrackClick(e: MouseEvent) {
    if (e.target === this.$refs.notch || this.drag.afterDragging) {
      return
    }

    const position = e.clientX - this.$refs.track.getBoundingClientRect().left
    const width = this.$refs.track.getBoundingClientRect().width
    const percentage = position / width
    this.$emit('input', this.getValueFromPercentage(percentage))
  }

  public get position() {
    return ((this.cachedValue - this.min) / (this.max - this.min)) * 100
  }

  private getValueFromDeltaPercentage(percentage: number) {
    // return this.getValueFromPercentage(this.value / (this.max - this.min) + percentage)
    let newValue = this.value + percentage * (this.max - this.min)
    newValue = newValue < this.min ? this.min : newValue
    newValue = newValue > this.max ? this.max : newValue

    const mod = (newValue - this.min) % this.step
    if (mod) {
      if (mod < this.step / 2) {
        newValue -= mod
      } else {
        newValue += this.step - mod
      }
    }

    return newValue
  }

  private getValueFromPercentage(percentage: number) {
    let newValue = percentage * (this.max - this.min) + this.min

    const mod = (newValue - this.min) % this.step
    if (mod) {
      if (mod < this.step / 2) {
        newValue -= mod
      } else {
        newValue += this.step - mod
      }
    }

    return newValue
  }

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Watch('value')
  public valueChange() {
    this.cachedValue = this.value
  }
}
