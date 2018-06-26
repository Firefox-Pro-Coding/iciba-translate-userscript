import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import ScrollBar from '~/src/components/ScrollBar/ScrollBar.vue'

@Component({
  name: 'GoogleTranslateContainer',
  components: {
    ScrollBar,
  },
})
export default class App extends Vue {
  public translateResult = ''

  public visibleCallback() {
    this.$nextTick(() => {
      const box = this.$refs.scrollBox as any
      box.scrollToTop()
      box.recalcScrollbar()
    })
  }
}
