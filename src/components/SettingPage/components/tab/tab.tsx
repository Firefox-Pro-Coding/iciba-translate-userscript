import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'ITab',
  components: {
  },
})
export default class ITab extends Vue {
  public render() {
    return (
      <div class="i-tab__div">{this.$scopedSlots.default ? this.$scopedSlots.default({}) : null}</div>
    )
  }
}
