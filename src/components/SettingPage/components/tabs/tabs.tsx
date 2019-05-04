import Vue, { VNode } from 'vue'
import { Component, Prop, Watch, Model } from 'vue-property-decorator'

@Component({
  name: 'ITabs',
  components: {
  },
})
export default class ITabs extends Vue {
  public $refs!: {
    container: HTMLDivElement
    box: HTMLDivElement
    tab: Array<HTMLDivElement>
  }
  @Model('input', { type: Number, default: 0 })
  public value!: number

  @Prop({ type: String, default: '' })
  public sliderColor!: string

  public tab = 0
  public slider = {
    top: 0,
    height: 0,
  }
  public hasArrowButton = false

  public mounted() {
    this.tab = this.value
    this.updateSlider()
  }

  public updated() {
    // this.updateSlider()
  }

  public updateSlider() {
    const height = this.$refs.tab[this.tab].getBoundingClientRect().height
    const top = this.$refs.tab
      .filter((_v, i) => i < this.tab)
      .map(v => v.getBoundingClientRect().height)
      .reduce((p, c) => p + c, 0)
    this.slider = {
      top,
      height,
    }
  }

  public get boxStyle() {
    return {}
  }

  public get sliderStyle() {
    return {
      top: `${this.slider.top}px`,
      height: `${this.slider.height}px`,
      ...(this.sliderColor ? { color: this.sliderColor } : {}),
    }
  }

  @Watch('tab')
  protected tabChange() {
    this.$emit('input', this.tab)
    this.updateSlider()
  }

  @Watch('value')
  protected valueChange() {
    this.tab = this.value
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public render() {
    let tabs: Array<VNode> = (this.$scopedSlots.default ? this.$scopedSlots.default({}) : null) || []
    tabs = tabs.filter(v => v.componentOptions && v.componentOptions.tag === 'i-tab')
    return (
      <div
        class="flex-co tabs__div align-stretch">
        <div class="slider" style={this.sliderStyle}></div>
        {tabs.map((tab, index) => (
          <div
            refInFor={true}
            ref="tab"
            class={{
              'tab__div flex flex-center': true,
              'active': this.tab === index,
            }}
            v-ripple={{ class: this.tab === index ? 'active-ripple' : 'inactive-ripple' }}
            onClick={() => { this.tab = index }}
            key={index}>
            {tab}
          </div>
        ))}
      </div>
    )
  }
}
