import Vue from 'vue'
import { Component, Prop, Watch, Model } from 'vue-property-decorator'

@Component({
  name: 'ITabs',
  components: {
  },
})
export default class ITabs extends Vue {
  public $refs!: {
    tab: Array<HTMLDivElement>
  }
  @Model('input', { type: Number, default: 0 })
  public value!: number

  @Prop({ type: Array, default: [] })
  public tabs!: Array<string>

  public tab = 0
  public sliderStyle = {
    left: '0px',
    width: '0px',
  }

  public mounted() {
    this.tab = this.value
    this.updateSlider()
  }

  public updated() {
    // this.updateSlider()
  }

  public updateSlider() {
    const width = this.$refs.tab[this.tab].getBoundingClientRect().width
    const left = this.$refs.tab
      .filter((_v, i) => i < this.tab)
      .map(v => v.getBoundingClientRect().width)
      .reduce((p, c) => p + c, 0)
    this.sliderStyle = {
      left: `${left}px`,
      width: `${width}px`,
    }
  }

  @Watch('tab')
  public tabChange() {
    this.$emit('input', this.tab)
    this.updateSlider()
  }

  @Watch('value')
  public valueChange() {
    this.tab = this.value
  }
}
