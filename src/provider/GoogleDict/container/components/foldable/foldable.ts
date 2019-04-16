import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictFoldable',
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false })
  public fold!: boolean

  public foldTimeout = 0
  public duration = 300

  public foldableStyle = { height: 'auto' }

  public $refs!: {
    wrapper: HTMLDivElement
  }

  public mounted() {
    if (this.fold) {
      this.foldableStyle = { height: '0' }
    } else {
      this.foldableStyle = { height: 'auto' }
    }
  }

  @Watch('fold')
  public foldChange() {
    this.getFoldableStyle()
  }

  public getFoldableStyle() {
    if (this.fold) {
      this.doFold()
    } else {
      this.doExpand()
    }
  }

  private doFold() {
    if (this.foldTimeout) {
      window.clearTimeout(this.foldTimeout)
    }
    if (this.$refs.wrapper) {
      this.foldableStyle = {
        height: `${this.$refs.wrapper.clientHeight}px`,
      }
    }
    this.foldTimeout = window.setTimeout(() => {
      this.foldableStyle = { height: '0' }
    })
  }

  private doExpand() {
    if (this.foldTimeout) {
      window.clearTimeout(this.foldTimeout)
    }
    if (this.$refs.wrapper) {
      this.foldableStyle = {
        height: `${this.$refs.wrapper.clientHeight}px`,
      }
    }
    this.foldTimeout = window.setTimeout(() => {
      this.foldableStyle = { height: 'auto' }
    }, this.duration)
  }
}
