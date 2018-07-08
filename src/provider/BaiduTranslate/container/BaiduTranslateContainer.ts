import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'IcibaContainer',
  components: {
  },
})
export default class App extends Vue {
  public data = ''

  public visibleCallback() {
    // this.$nextTick(() => {
    //   const box = this.$refs.scrollBox as any
    //   box.scrollToTop()
    //   box.recalcScrollbar()
    // })
  }
}
